const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  image: { type: String },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  startTime: { type: String },
  endTime: { type: String },
  location: { type: String },
  mode: { type: String, enum: ['online', 'offline'], default: 'online' },
  meetingUrl: { type: String },
  instructor: { type: String },
  price: { type: Number, required: true, default: 0 },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  category: { type: String, enum: ['event', 'cohort', 'class'], default: 'event' }
}, { timestamps: true });

// Pre-save to auto-generate slug if not present or changed
eventSchema.pre('validate', function(next) {
  if (this.title && (!this.slug || this.isModified('title'))) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
