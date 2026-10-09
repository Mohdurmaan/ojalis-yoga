const Journal = require('../models/Journal');
const Studio = require('../models/Studio');
const Event = require('../models/Event');
const Teacher = require('../models/Teacher');

const getDashboardStats = async (req, res) => {
  try {
    const totalJournals = await Journal.countDocuments();
    const publishedJournals = await Journal.countDocuments({ status: 'published' });
    const totalStudioPhotos = await Studio.countDocuments();
    const totalEvents = await Event.countDocuments();
    const upcomingEvents = await Event.countDocuments({ date: { $gte: new Date() } });
    const totalTeachers = await Teacher.countDocuments();
    const publishedTeachers = await Teacher.countDocuments({ status: 'published' });
    res.status(200).json({
      success: true,
      data: {
        totalJournals, publishedJournals,
        totalStudioPhotos, totalEvents, upcomingEvents,
        totalTeachers, publishedTeachers
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboardStats };
