const express = require('express');
const mongoose = require('mongoose');
const { startConsumer } = require('./kafkaConsumer');
const { connectProducer } = require('./kafkaProducer');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected (Shipping)'))
  .catch(err => console.error(err));

connectProducer();
startConsumer();

app.listen(3004, () => console.log('Shipping service running on port 3004'));
