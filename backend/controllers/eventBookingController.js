const EventBooking = require('../models/EventBooking');
const Event = require('../models/Event');
const User = require('../models/User');
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
    
    // Associate booking with user if authenticated or if email matches existing account
    let userId = req.user ? req.user._id : undefined;
    if (!userId && email) {
      const user = await User.findOne({ email: email.toLowerCase().trim() });
      if (user) userId = user._id;
    }

    const amount = Math.round(event.price * 100); // in paise
    
    const options = {
      amount,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7)
    };
    
    const order = await razorpay.orders.create(options);
    
    const booking = await EventBooking.create({
      userId,
      eventId,
      customerName,
      email: email ? email.toLowerCase().trim() : '',
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

// @desc    Get currently authenticated user's event bookings
// @route   GET /api/event-bookings/my
// @access  Private (User)
exports.getMyBookings = async (req, res) => {
  try {
    const userEmail = req.user.email ? req.user.email.toLowerCase() : '';
    const bookings = await EventBooking.find({
      $or: [
        { userId: req.user._id },
        { email: userEmail }
      ]
    })
    .populate('eventId', 'title slug image startDate endDate startTime endTime price location mode meetingUrl instructor category')
    .sort('-createdAt');

    res.json({ success: true, count: bookings.length, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Cancel user's own booking
// @route   PUT /api/event-bookings/my/:id/cancel
// @access  Private (User)
exports.cancelMyBooking = async (req, res) => {
  try {
    const booking = await EventBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });

    const isOwner = (booking.userId && booking.userId.toString() === req.user._id.toString()) ||
                    (booking.email && req.user.email && booking.email.toLowerCase() === req.user.email.toLowerCase());

    if (!isOwner) {
      return res.status(403).json({ success: false, message: 'Not authorized to manage this booking' });
    }

    if (booking.bookingStatus === 'Cancelled') {
      return res.status(400).json({ success: false, message: 'Booking is already cancelled' });
    }

    booking.bookingStatus = 'Cancelled';
    await booking.save();

    res.json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin handlers below
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
