const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'order-service',
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
};

const sendEvent = async (topic, event) => {
  await producer.send({
    topic,
    messages: [{ key: event.orderId, value: JSON.stringify(event) }]
  });
};

module.exports = { connectProducer, sendEvent };
