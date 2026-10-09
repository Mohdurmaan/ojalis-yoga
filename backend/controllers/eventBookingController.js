const EventBooking = require('../models/EventBooking');
const Event = require('../models/Event');
const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_dummy',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_secret'
});

exports.createOrder = async (req, res) => {
  try {
    const { eventId, customerName, email, phone, message } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    
    const amount = Math.round(event.price * 100); // in paise
    
    const options = {
      amount,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7)
    };
    
    const order = await razorpay.orders.create(options);
    
    const booking = await EventBooking.create({
      eventId,
      customerName,
      email,
      phone,
      message,
      amount: event.price,
      razorpayOrderId: order.id,
      paymentStatus: 'Pending',
      bookingStatus: 'New'
    });
    
    res.json({ success: true, order, bookingId: booking._id, key: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    const errorMsg = err.message || (err.error && err.error.description) || 'Failed to create order with Razorpay';
    res.status(500).json({ success: false, message: errorMsg });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto.createHmac('sha256', secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');
      
    if (generated_signature === razorpay_signature) {
      await EventBooking.findByIdAndUpdate(bookingId, {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paymentStatus: 'Paid',
        bookingStatus: 'Confirmed'
      });
      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      await EventBooking.findByIdAndUpdate(bookingId, { paymentStatus: 'Failed' });
      res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await EventBooking.find().populate('eventId', 'title startDate endDate price').sort('-createdAt');
    res.json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await EventBooking.findById(req.params.id).populate('eventId');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const booking = await EventBooking.findByIdAndUpdate(req.params.id, { bookingStatus: req.body.bookingStatus }, { new: true });
    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await EventBooking.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.getPayoutSummary = async (req, res) => {
  try {
    const bookings = await EventBooking.find({ paymentStatus: 'Paid' });
    const totalCollected = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const successfulBookings = bookings.length;
    // Assuming no specific fees or refunds are tracked in DB, Net Payout = Total Collected
    res.json({
      success: true,
      data: {
        totalCollected,
        successfulBookings,
        netPayout: totalCollected
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
