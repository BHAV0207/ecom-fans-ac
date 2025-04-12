const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  photo: String,  
  role: { type: String, enum: ['user', 'admin', 'rider'], default: 'user' }
},{ timestamps: true });

module.exports = mongoose.model('User', userSchema);
