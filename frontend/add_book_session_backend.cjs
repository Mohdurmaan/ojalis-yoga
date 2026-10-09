const fs = require('fs');
const path = require('path');

const backendDir = 'e:\\\\ujalishyoga\\\\backend';

// 1. Create Model
const modelPath = path.join(backendDir, 'models', 'BookSession.js');
fs.writeFileSync(modelPath, `const mongoose = require('mongoose');

const bookSessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  program: { type: String, default: 'General Classical Hatha Yoga' },
  date: { type: String, required: true },
  timeSlot: { type: String, default: 'Morning: 6:00 AM – 7:15 AM' },
  message: { type: String },
  status: { type: String, enum: ['New', 'Contacted', 'Completed', 'Cancelled'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.model('BookSession', bookSessionSchema);
`);

// 2. Create Controller
const controllerPath = path.join(backendDir, 'controllers', 'bookSessionController.js');
fs.writeFileSync(controllerPath, `const BookSession = require('../models/BookSession');

exports.createSession = async (req, res) => {
  try {
    const session = await BookSession.create(req.body);
    res.status(201).json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await BookSession.find().sort('-createdAt');
    res.status(200).json({ success: true, data: sessions });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getSession = async (req, res) => {
  try {
    const session = await BookSession.findById(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await BookSession.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  try {
    const session = await BookSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
`);

// 3. Create Routes
const routesPath = path.join(backendDir, 'routes', 'bookSessionRoutes.js');
fs.writeFileSync(routesPath, `const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSession,
  updateSession,
  deleteSession
} = require('../controllers/bookSessionController');
const { protect } = require('../middleware/auth');

router.route('/')
  .post(createSession)
  .get(protect, getSessions);

router.route('/:id')
  .get(protect, getSession)
  .put(protect, updateSession)
  .delete(protect, deleteSession);

module.exports = router;
`);

// 4. Update server.js
const serverPath = path.join(backendDir, 'server.js');
let serverContent = fs.readFileSync(serverPath, 'utf8');
if (!serverContent.includes('bookSessionRoutes')) {
  // Add route import
  serverContent = serverContent.replace(
    "const connectDB = require('./config/db');",
    "const connectDB = require('./config/db');\nconst bookSessionRoutes = require('./routes/bookSessionRoutes');"
  );
  // Add route usage before error handling
  serverContent = serverContent.replace(
    "// Centralized error handling",
    "// Book Session routes\napp.use('/api/book-sessions', bookSessionRoutes);\n\n// Centralized error handling"
  );
  fs.writeFileSync(serverPath, serverContent);
}

console.log('Backend scaffolding for Book Sessions complete.');
