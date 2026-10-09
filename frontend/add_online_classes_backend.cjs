const fs = require('fs');
const path = require('path');
const backendDir = 'e:\\\\ujalishyoga\\\\backend';

// 1. Update Event Model
const eventModelPath = path.join(backendDir, 'models', 'Event.js');
const eventContent = `const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String },
  endTime: { type: String },
  location: { type: String },
  mode: { type: String, enum: ['online', 'offline'], default: 'online' },
  meetingUrl: { type: String },
  instructor: { type: String },
  price: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  category: { type: String, enum: ['event', 'cohort', 'class'], default: 'event' }
}, { timestamps: true });

// Pre-save to auto-generate slug if not present or changed
eventSchema.pre('validate', function(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
`;
fs.writeFileSync(eventModelPath, eventContent);

// 2. Create EventBooking Model
const bookingModelPath = path.join(backendDir, 'models', 'EventBooking.js');
const bookingContent = `const mongoose = require('mongoose');

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
`;
fs.writeFileSync(bookingModelPath, bookingContent);

// 3. Update Event Controller to handle startDate and endDate and slug lookups
const eventCtrlPath = path.join(backendDir, 'controllers', 'eventController.js');
const eventCtrlContent = `const Event = require('../models/Event');

exports.getEvents = async (req, res) => {
  try {
    // Both admin and public use this. If public, filter only published.
    let filter = {};
    if (!req.user) {
      filter.status = 'published';
    }
    const events = await Event.find(filter).sort('startDate');
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug, status: 'published' });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.path.replace(/\\\\/g, '/');
    const event = await Event.create(data);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.path.replace(/\\\\/g, '/');
    const event = await Event.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
`;
fs.writeFileSync(eventCtrlPath, eventCtrlContent);

// 4. Update Event Routes
const eventRoutesPath = path.join(backendDir, 'routes', 'eventRoutes.js');
let eventRoutesContent = fs.readFileSync(eventRoutesPath, 'utf8');
if (!eventRoutesContent.includes('getEventBySlug')) {
  eventRoutesContent = eventRoutesContent.replace(
    "const { getEvents, getEvent, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');",
    "const { getEvents, getEvent, getEventBySlug, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');"
  );
  eventRoutesContent = eventRoutesContent.replace(
    "router.route('/:id').get(getEvent)",
    "router.get('/slug/:slug', getEventBySlug);\nrouter.route('/:id').get(getEvent)"
  );
  fs.writeFileSync(eventRoutesPath, eventRoutesContent);
}

// 5. Create EventBooking Controller (Razorpay)
// Make sure Razorpay is installed in backend
const { execSync } = require('child_process');
try {
  execSync('npm install razorpay crypto', { cwd: backendDir, stdio: 'inherit' });
} catch (e) {
  console.log('Razorpay install failed, it might be already there.');
}

const razorpayCtrlPath = path.join(backendDir, 'controllers', 'eventBookingController.js');
const razorpayContent = `const EventBooking = require('../models/EventBooking');
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
`;
fs.writeFileSync(razorpayCtrlPath, razorpayContent);

// 6. Create EventBooking Routes
const bookingRoutesPath = path.join(backendDir, 'routes', 'eventBookingRoutes.js');
const bookingRoutesContent = `const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getAllBookings, getBooking, updateBookingStatus, deleteBooking } = require('../controllers/eventBookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

// Admin routes
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
`;
fs.writeFileSync(bookingRoutesPath, bookingRoutesContent);

// 7. Add to Server
const serverPath = path.join(backendDir, 'server.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');
if (!serverContent.includes('eventBookingRoutes')) {
  serverContent = serverContent.replace(
    "const eventRoutes = require('./routes/eventRoutes');",
    "const eventRoutes = require('./routes/eventRoutes');\nconst eventBookingRoutes = require('./routes/eventBookingRoutes');"
  );
  serverContent = serverContent.replace(
    "app.use('/api/events', eventRoutes);",
    "app.use('/api/events', eventRoutes);\napp.use('/api/event-bookings', eventBookingRoutes);"
  );
  fs.writeFileSync(serverPath, serverContent);
}

// 8. Add Razorpay env vars to .env
const envPath = path.join(backendDir, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('RAZORPAY_KEY_ID')) {
  envContent += "\nRAZORPAY_KEY_ID=rzp_test_Tah0epowIqRMlt\nRAZORPAY_KEY_SECRET=kSfUP6DeglMvcW17wnz95jhU\n";
  fs.writeFileSync(envPath, envContent);
}

console.log("Backend scaffolding for Online Classes Event + Razorpay complete.");
