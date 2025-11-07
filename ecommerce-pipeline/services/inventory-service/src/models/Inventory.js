const mongoose = require('mongoose');

const InventorySchema = new mongoose.Schema({
  orderId: { type: String, unique: true },
  status: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Inventory', InventorySchema);
