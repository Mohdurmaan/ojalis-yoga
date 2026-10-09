const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profileImage: { type: String },
  shortBio: { type: String },
  biography: { type: String },
  qualifications: { type: String },
  specializations: { type: String },
  experience: { type: String },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });
module.exports = mongoose.model('Teacher', teacherSchema);
