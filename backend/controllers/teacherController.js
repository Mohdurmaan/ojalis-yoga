const Teacher = require('../models/Teacher');

const getItems = async (req, res) => {
  try {
    const filter = req.user ? {} : { status: 'published' };
    const items = await Teacher.find(filter).sort('-createdAt');
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getItem = async (req, res) => {
  try {
    const item = await Teacher.findById(req.params.id);
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
      const fileUrl = req.file.path || req.file.url;
      req.body.image = fileUrl;
      req.body.featuredImage = fileUrl;
      req.body.profileImage = fileUrl;
    }
    const item = await Teacher.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateItem = async (req, res) => {
  try {
    if (req.file) {
      const fileUrl = req.file.path || req.file.url;
      req.body.image = fileUrl;
      req.body.featuredImage = fileUrl;
      req.body.profileImage = fileUrl;
    }
    const item = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const deleteItem = async (req, res) => {
  try {
    const item = await Teacher.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getItems, getItem, createItem, updateItem, deleteItem };
