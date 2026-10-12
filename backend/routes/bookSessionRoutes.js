const express = require('express');
const router = express.Router();
const {
  createSession,
  getMySessions,
  getSessions,
  getSession,
  updateSession,
  deleteSession
} = require('../controllers/bookSessionController');
const { protect, adminOnly, optionalAuth } = require('../middleware/authMiddleware');

router.post('/', optionalAuth, createSession);
router.get('/my', protect, getMySessions);

// Admin-only management
router.get('/', protect, adminOnly, getSessions);
router.route('/:id')
  .get(protect, adminOnly, getSession)
  .put(protect, adminOnly, updateSession)
  .delete(protect, adminOnly, deleteSession);

module.exports = router;
