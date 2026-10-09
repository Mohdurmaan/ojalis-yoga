const express = require('express');
const router = express.Router();
const { createOrder, verifyPayment, getAllBookings, getBooking, updateBookingStatus, deleteBooking, getPayoutSummary } = require('../controllers/eventBookingController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

// Admin routes
router.get('/payout-summary', protect, getPayoutSummary);
router.get('/', protect, getAllBookings);
router.get('/:id', protect, getBooking);
router.put('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, deleteBooking);

module.exports = router;
