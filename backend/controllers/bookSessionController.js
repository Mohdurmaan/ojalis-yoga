const BookSession = require('../models/BookSession');
const User = require('../models/User');

exports.createSession = async (req, res) => {
  try {
    let userId = req.user ? req.user._id : undefined;
    if (!userId && req.body.email) {
      const user = await User.findOne({ email: req.body.email.toLowerCase().trim() });
      if (user) userId = user._id;
    }
    const sessionData = {
      ...req.body,
      userId,
      email: req.body.email ? req.body.email.toLowerCase().trim() : ''
    };
    const session = await BookSession.create(sessionData);
    res.status(201).json({ success: true, data: session });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getMySessions = async (req, res) => {
  try {
    const userEmail = req.user.email ? req.user.email.toLowerCase() : '';
    const sessions = await BookSession.find({
      $or: [
        { userId: req.user._id },
        { email: userEmail }
      ]
    }).sort('-createdAt');
    res.status(200).json({ success: true, count: sessions.length, data: sessions });
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
