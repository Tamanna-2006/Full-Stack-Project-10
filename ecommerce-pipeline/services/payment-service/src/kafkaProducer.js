const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'payment-service',
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Payment Producer connected");
};

const sendEvent = async (topic, event) => {
  await producer.send({
    topic,
    messages: [{ key: event.orderId, value: JSON.stringify(event) }]
  });
};

module.exports = { connectProducer, sendEvent };
