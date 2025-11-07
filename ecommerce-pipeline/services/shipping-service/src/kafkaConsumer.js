const { Kafka } = require('kafkajs');
const { sendEvent } = require('./kafkaProducer');
const Shipping = require('./models/Shipping');
const { v4: uuidv4 } = require('uuid');

const kafka = new Kafka({
  clientId: 'shipping-service',
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'shipping-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      if (event.eventType === 'PaymentAuthorized') {
        console.log(`Shipping service processing order ${event.orderId}`);

        const status = 'SHIPPED';

        const shipping = new Shipping({ orderId: event.orderId, status });
        await shipping.save();

        await sendEvent('shipping-events', {
          eventId: uuidv4(),
          orderId: event.orderId,
          eventType: 'OrderShipped',
          payload: { status },
          timestamp: new Date()
        });
      }
    }
  });
};

module.exports = { startConsumer };
