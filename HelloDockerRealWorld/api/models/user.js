const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Тепер є пароль
  role: { type: String, enum: ['buyer', 'seller'], default: 'buyer' }, // Роль: покупець або продавець
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);