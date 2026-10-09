const mongoose = require('mongoose');
const journalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  featuredImage: { type: String },
  excerpt: { type: String },
  content: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model('Journal', journalSchema);
