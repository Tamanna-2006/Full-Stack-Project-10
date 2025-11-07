const { Kafka } = require('kafkajs');
const { sendEvent } = require('./kafkaProducer');
const Payment = require('./models/Payment');
const { v4: uuidv4 } = require('uuid');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'payment-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'inventory-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      if (event.eventType === 'InventoryReserved') {
        console.log(`Payment service processing order ${event.orderId}`);

        const status = Math.random() < 0.9 ? 'AUTHORIZED' : 'FAILED';

        const payment = new Payment({ orderId: event.orderId, status });
        await payment.save();

        const nextEventType = status === 'AUTHORIZED' ? 'PaymentAuthorized' : 'PaymentFailed';
        await sendEvent('payment-events', {
          eventId: uuidv4(),
          orderId: event.orderId,
          eventType: nextEventType,
          payload: { status },
          timestamp: new Date()
        });
      }
    }
  });
};

module.exports = { startConsumer };
