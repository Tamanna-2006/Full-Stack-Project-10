const express = require('express');
const mongoose = require('mongoose');
const { startConsumer } = require('./kafkaConsumer');
const { connectProducer } = require('./kafkaProducer');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected (Inventory)'))
  .catch(err => console.error(err));

connectProducer();
startConsumer();

app.listen(3002, () => console.log('Inventory service running on port 3002'));
