const { Kafka } = require('kafkajs');
const { sendEvent } = require('./kafkaProducer');
const Inventory = require('./models/Inventory');
const { v4: uuidv4 } = require('uuid');

const kafka = new Kafka({
  clientId: 'inventory-service',
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafka.consumer({ groupId: 'inventory-group' });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'order-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());
      if (event.eventType === 'OrderCreated') {
        console.log(`Inventory service processing order ${event.orderId}`);

        // Simple inventory check simulation
        const status = Math.random() < 0.9 ? 'RESERVED' : 'FAILED';

        const inventory = new Inventory({ orderId: event.orderId, status });
        await inventory.save();

        const nextEventType = status === 'RESERVED' ? 'InventoryReserved' : 'InventoryFailed';
        await sendEvent('inventory-events', {
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
