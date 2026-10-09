const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession
} = require('../controllers/bookSessionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createSession)
  .get(protect, getSessions);

router.route('/:id')
  .get(protect, getSession)
  .put(protect, updateSession)
  .delete(protect, deleteSession);

module.exports = router;
