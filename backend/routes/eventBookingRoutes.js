const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getMyBookings,
  cancelMyBooking,
  getAllBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking,
  getPayoutSummary
} = require('../controllers/eventBookingController');
const { protect, adminOnly, optionalAuth } = require('../middleware/authMiddleware');

// Order & Payment
router.post('/create-order', optionalAuth, createOrder);
router.post('/verify-payment', verifyPayment);

// User booking routes
router.get('/my', protect, getMyBookings);
router.put('/my/:id/cancel', protect, cancelMyBooking);

// Admin-only management routes
router.get('/payout-summary', protect, adminOnly, getPayoutSummary);
router.get('/', protect, adminOnly, getAllBookings);
router.get('/:id', protect, adminOnly, getBooking);
router.put('/:id', protect, adminOnly, updateBookingStatus);
router.delete('/:id', protect, adminOnly, deleteBooking);

module.exports = router;
