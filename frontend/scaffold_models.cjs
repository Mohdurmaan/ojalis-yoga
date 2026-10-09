const fs = require('fs');
const path = require('path');
const backendDir = 'e:\\\\ujalishyoga\\\\backend';

const uploadMiddlewareContent = "const multer = require('multer');\n" +
"const path = require('path');\n\n" +
"const storage = multer.diskStorage({\n" +
"  destination(req, file, cb) {\n" +
"    cb(null, 'uploads/');\n" +
"  },\n" +
"  filename(req, file, cb) {\n" +
"    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));\n" +
"  }\n" +
"});\n\n" +
"function checkFileType(file, cb) {\n" +
"  const filetypes = /jpg|jpeg|png|webp/;\n" +
"  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());\n" +
"  const mimetype = filetypes.test(file.mimetype);\n\n" +
"  if (extname && mimetype) {\n" +
"    return cb(null, true);\n" +
"  } else {\n" +
"    cb('Images only!');\n" +
"  }\n" +
"}\n\n" +
"const upload = multer({\n" +
"  storage,\n" +
"  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max\n" +
"  fileFilter: function (req, file, cb) {\n" +
"    checkFileType(file, cb);\n" +
"  }\n" +
"});\n\n" +
"module.exports = upload;\n";

fs.writeFileSync(path.join(backendDir, 'middleware', 'uploadMiddleware.js'), uploadMiddlewareContent);

const journalContent = "const mongoose = require('mongoose');\n" +
"const journalSchema = new mongoose.Schema({\n" +
"  title: { type: String, required: true },\n" +
"  slug: { type: String, required: true, unique: true },\n" +
"  featuredImage: { type: String },\n" +
"  excerpt: { type: String },\n" +
"  content: { type: String, required: true },\n" +
"  author: { type: String, required: true },\n" +
"  category: { type: String },\n" +
"  status: { type: String, enum: ['draft', 'published'], default: 'draft' },\n" +
"  publishedAt: { type: Date }\n" +
"}, { timestamps: true });\n" +
"module.exports = mongoose.model('Journal', journalSchema);\n";

fs.writeFileSync(path.join(backendDir, 'models', 'Journal.js'), journalContent);

const studioContent = "const mongoose = require('mongoose');\n" +
"const studioSchema = new mongoose.Schema({\n" +
"  title: { type: String, required: true },\n" +
"  image: { type: String, required: true },\n" +
"  category: { type: String },\n" +
"  description: { type: String },\n" +
"  displayOrder: { type: Number, default: 0 },\n" +
"  status: { type: String, enum: ['draft', 'published'], default: 'published' }\n" +
"}, { timestamps: true });\n" +
"module.exports = mongoose.model('Studio', studioSchema);\n";

fs.writeFileSync(path.join(backendDir, 'models', 'Studio.js'), studioContent);

const eventContent = "const mongoose = require('mongoose');\n" +
"const eventSchema = new mongoose.Schema({\n" +
"  title: { type: String, required: true },\n" +
"  image: { type: String },\n" +
"  description: { type: String },\n" +
"  date: { type: Date, required: true },\n" +
"  startTime: { type: String },\n" +
"  endTime: { type: String },\n" +
"  location: { type: String },\n" +
"  mode: { type: String, enum: ['online', 'offline'], default: 'online' },\n" +
"  meetingUrl: { type: String },\n" +
"  instructor: { type: String },\n" +
"  price: { type: Number },\n" +
"  registrationUrl: { type: String },\n" +
"  status: { type: String, enum: ['draft', 'published'], default: 'published' }\n" +
"}, { timestamps: true });\n" +
"module.exports = mongoose.model('Event', eventSchema);\n";

fs.writeFileSync(path.join(backendDir, 'models', 'Event.js'), eventContent);

const teacherContent = "const mongoose = require('mongoose');\n" +
"const teacherSchema = new mongoose.Schema({\n" +
"  name: { type: String, required: true },\n" +
"  profileImage: { type: String },\n" +
"  shortBio: { type: String },\n" +
"  biography: { type: String },\n" +
"  qualifications: { type: String },\n" +
"  specializations: { type: String },\n" +
"  experience: { type: String },\n" +
"  displayOrder: { type: Number, default: 0 },\n" +
"  status: { type: String, enum: ['draft', 'published'], default: 'published' }\n" +
"}, { timestamps: true });\n" +
"module.exports = mongoose.model('Teacher', teacherSchema);\n";

fs.writeFileSync(path.join(backendDir, 'models', 'Teacher.js'), teacherContent);

console.log("Models scaffolded.");
