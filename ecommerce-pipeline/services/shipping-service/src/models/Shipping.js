const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shipping', ShippingSchema);
