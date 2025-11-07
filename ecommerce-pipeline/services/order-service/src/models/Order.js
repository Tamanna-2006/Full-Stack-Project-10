const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventId: String,
  eventType: String,
  payload: Object,
  timestamp: Date
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  status: String,
  events: [EventSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
