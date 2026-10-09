const fs = require('fs');
const path = require('path');
const backendDir = 'e:\\\\ujalishyoga\\\\backend';

const createController = (name, modelName) => {
  const content = "const " + modelName + " = require('../models/" + modelName + "');\n\n" +
  "const getItems = async (req, res) => {\n" +
  "  try {\n" +
  "    const filter = req.user ? {} : { status: 'published' };\n" +
  "    const items = await " + modelName + ".find(filter).sort('-createdAt');\n" +
  "    res.status(200).json({ success: true, data: items });\n" +
  "  } catch (error) {\n" +
  "    res.status(500).json({ success: false, message: error.message });\n" +
  "  }\n" +
  "};\n\n" +
  "const getItem = async (req, res) => {\n" +
  "  try {\n" +
  "    const item = await " + modelName + ".findById(req.params.id);\n" +
  "    if (!item) return res.status(404).json({ success: false, message: 'Not found' });\n" +
  "    if (!req.user && item.status !== 'published') return res.status(404).json({ success: false, message: 'Not found' });\n" +
  "    res.status(200).json({ success: true, data: item });\n" +
  "  } catch (error) {\n" +
  "    res.status(500).json({ success: false, message: error.message });\n" +
  "  }\n" +
  "};\n\n" +
  "const createItem = async (req, res) => {\n" +
  "  try {\n" +
  "    if (req.file) {\n" +
  "      req.body.image = '/uploads/' + req.file.filename;\n" +
  "      req.body.featuredImage = '/uploads/' + req.file.filename;\n" +
  "      req.body.profileImage = '/uploads/' + req.file.filename;\n" +
  "    }\n" +
  "    const item = await " + modelName + ".create(req.body);\n" +
  "    res.status(201).json({ success: true, data: item });\n" +
  "  } catch (error) {\n" +
  "    res.status(400).json({ success: false, message: error.message });\n" +
  "  }\n" +
  "};\n\n" +
  "const updateItem = async (req, res) => {\n" +
  "  try {\n" +
  "    if (req.file) {\n" +
  "      req.body.image = '/uploads/' + req.file.filename;\n" +
  "      req.body.featuredImage = '/uploads/' + req.file.filename;\n" +
  "      req.body.profileImage = '/uploads/' + req.file.filename;\n" +
  "    }\n" +
  "    const item = await " + modelName + ".findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });\n" +
  "    if (!item) return res.status(404).json({ success: false, message: 'Not found' });\n" +
  "    res.status(200).json({ success: true, data: item });\n" +
  "  } catch (error) {\n" +
  "    res.status(400).json({ success: false, message: error.message });\n" +
  "  }\n" +
  "};\n\n" +
  "const deleteItem = async (req, res) => {\n" +
  "  try {\n" +
  "    const item = await " + modelName + ".findByIdAndDelete(req.params.id);\n" +
  "    if (!item) return res.status(404).json({ success: false, message: 'Not found' });\n" +
  "    res.status(200).json({ success: true, data: {} });\n" +
  "  } catch (error) {\n" +
  "    res.status(500).json({ success: false, message: error.message });\n" +
  "  }\n" +
  "};\n\n" +
  "module.exports = { getItems, getItem, createItem, updateItem, deleteItem };\n";
  fs.writeFileSync(path.join(backendDir, 'controllers', name + 'Controller.js'), content);
};

createController('journal', 'Journal');
createController('studio', 'Studio');
createController('event', 'Event');
createController('teacher', 'Teacher');

const dashContent = "const Journal = require('../models/Journal');\n" +
"const Studio = require('../models/Studio');\n" +
"const Event = require('../models/Event');\n" +
"const Teacher = require('../models/Teacher');\n\n" +
"const getDashboardStats = async (req, res) => {\n" +
"  try {\n" +
"    const totalJournals = await Journal.countDocuments();\n" +
"    const publishedJournals = await Journal.countDocuments({ status: 'published' });\n" +
"    const totalStudioPhotos = await Studio.countDocuments();\n" +
"    const totalEvents = await Event.countDocuments();\n" +
"    const upcomingEvents = await Event.countDocuments({ date: { $gte: new Date() } });\n" +
"    const totalTeachers = await Teacher.countDocuments();\n" +
"    const publishedTeachers = await Teacher.countDocuments({ status: 'published' });\n" +
"    res.status(200).json({\n" +
"      success: true,\n" +
"      data: {\n" +
"        totalJournals, publishedJournals,\n" +
"        totalStudioPhotos, totalEvents, upcomingEvents,\n" +
"        totalTeachers, publishedTeachers\n" +
"      }\n" +
"    });\n" +
"  } catch (error) {\n" +
"    res.status(500).json({ success: false, message: error.message });\n" +
"  }\n" +
"};\n\n" +
"module.exports = { getDashboardStats };\n";

fs.writeFileSync(path.join(backendDir, 'controllers', 'dashboardController.js'), dashContent);
console.log('Controllers scaffolded.');
