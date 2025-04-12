const mongoose = require('mongoose');

const approvedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin', 'rider'], default: 'user' }
});

module.exports = mongoose.model('ApprovedEmail', approvedEmailSchema);
