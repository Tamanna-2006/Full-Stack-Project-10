const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const { connectProducer } = require('./kafkaProducer');

const app = express();
app.use(express.json());
app.use('/api', routes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

connectProducer().then(() => console.log('Kafka Producer connected'));

app.listen(3001, () => console.log('Order service running on port 3001'));
