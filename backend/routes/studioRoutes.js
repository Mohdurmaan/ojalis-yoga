const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/studioController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(protect, upload.single('image'), createItem);

router.route('/:id')
  .get(getItem)
  .put(protect, upload.single('image'), updateItem)
  .delete(protect, deleteItem);

module.exports = router;
