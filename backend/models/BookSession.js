const mongoose = require('mongoose');

const bookSessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: String, default: 'General Classical Hatha Yoga' },
  date: { type: String, required: true },
  timeSlot: { type: String, default: 'Morning: 6:00 AM – 7:15 AM' },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Completed', 'Cancelled'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('BookSession', bookSessionSchema);
