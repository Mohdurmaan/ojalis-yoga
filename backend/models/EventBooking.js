const mongoose = require('mongoose');

const eventBookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String },
  amount: { type: Number, required: true },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Failed'], default: 'Pending' },
  bookingStatus: { type: String, enum: ['New', 'Confirmed', 'Cancelled'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('EventBooking', eventBookingSchema);
