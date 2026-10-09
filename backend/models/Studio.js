const mongoose = require('mongoose');
const studioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });
module.exports = mongoose.model('Studio', studioSchema);
