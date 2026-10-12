const express = require('express');
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/teacherController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.route('/')
  .get(getItems)
  .post(protect, adminOnly, upload.single('image'), createItem);

router.route('/:id')
  .get(getItem)
  .put(protect, adminOnly, upload.single('image'), updateItem)
  .delete(protect, adminOnly, deleteItem);

module.exports = router;
