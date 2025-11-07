const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'inventory-service',
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Inventory Producer connected");
};

const sendEvent = async (topic, event) => {
  await producer.send({
    topic,
    messages: [{ key: event.orderId, value: JSON.stringify(event) }]
  });
};

module.exports = { connectProducer, sendEvent };
