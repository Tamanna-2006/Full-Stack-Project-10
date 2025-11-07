const express = require('express');
const router = express.Router();
const Order = require('./models/Order');
const { sendEvent } = require('./kafkaProducer');
const { v4: uuidv4 } = require('uuid');

router.post('/orders', async (req, res) => {
  const orderId = uuidv4();
  const order = new Order({
    orderId,
    status: 'CREATED',
    events: [{
      eventId: uuidv4(),
      eventType: 'OrderCreated',
      payload: req.body,
      timestamp: new Date()
    }]
  });
  await order.save();

  await sendEvent('order-events', { 
    eventId: uuidv4(),
    eventType: 'OrderCreated',
    orderId,
    payload: req.body,
    timestamp: new Date()
  });

  res.status(201).json({ orderId });
});

router.get('/orders/:id', async (req, res) => {
  const order = await Order.findOne({ orderId: req.params.id });
  if (!order) return res.status(404).send('Order not found');
  res.json(order);
});

module.exports = router;
