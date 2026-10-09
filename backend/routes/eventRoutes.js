const express = require('express');
const router = express.Router();
const { getEvents, getEvent, getEventBySlug, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
  .get(getEvents)
  .post(protect, upload.single('image'), createEvent);

router.get('/slug/:slug', getEventBySlug);

router.route('/:id')
  .get(getEvent)
  .put(protect, upload.single('image'), updateEvent)
  .delete(protect, deleteEvent);

module.exports = router;
