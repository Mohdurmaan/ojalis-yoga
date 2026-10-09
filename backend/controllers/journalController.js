const Journal = require('../models/Journal');

const getItems = async (req, res) => {
  try {
    const filter = req.user ? {} : { status: 'published' };
    const items = await Journal.find(filter).sort('-createdAt');
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Journal.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    if (!req.user && item.status !== 'published') return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createItem = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = '/uploads/' + req.file.filename;
      req.body.featuredImage = '/uploads/' + req.file.filename;
      req.body.profileImage = '/uploads/' + req.file.filename;
    }
    const item = await Journal.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = '/uploads/' + req.file.filename;
      req.body.featuredImage = '/uploads/' + req.file.filename;
      req.body.profileImage = '/uploads/' + req.file.filename;
    }
    const item = await Journal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Journal.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
