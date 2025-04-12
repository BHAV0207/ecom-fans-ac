const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    color: String,
    size: String,
    quantity: Number
  }],
  address: String,
  status: { type: String, enum: ['Paid', 'Shipped', 'Delivered', 'Undelivered'], default: 'Paid' },
  assignedRider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
