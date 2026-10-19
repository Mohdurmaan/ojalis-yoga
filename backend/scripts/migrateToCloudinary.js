/**
 * Migration Script: Safely migrate local uploads to Cloudinary
 * 
 * Usage:
 *   node scripts/migrateToCloudinary.js
 * 
 * This script scans MongoDB collections (Journals, Studio, Teachers, Events)
 * for local image paths (e.g., /uploads/image-xxx.png), checks if the file exists
 * in backend/uploads/, uploads it to Cloudinary, and updates the database record.
 * Existing records are never deleted.
 */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');
const connectDB = require('../config/db');

const Journal = require('../models/Journal');
const Studio = require('../models/Studio');
const Teacher = require('../models/Teacher');
const Event = require('../models/Event');

const uploadsDir = path.join(__dirname, '..', 'uploads');

async function runMigration() {
  console.log('--- Ojalis Yoga Cloudinary Image Migration ---');

  if (!isCloudinaryConfigured()) {
    console.error('Error: Cloudinary credentials not found in environment.');
    console.error('Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in backend/.env');
    process.exit(1);
  }

  console.log('Cloudinary configuration found. Connecting to MongoDB...');
  await connectDB();

  // Wait for mongoose connection
  if (mongoose.connection.readyState !== 1) {
    await new Promise((resolve) => mongoose.connection.once('open', resolve));
  }

  let totalScanned = 0;
  let totalMigrated = 0;
  let totalAlreadyCloud = 0;
  let totalMissingFiles = 0;

  async function migrateField(doc, fieldName, modelName) {
    totalScanned++;
    const currentVal = doc[fieldName];
    if (!currentVal || typeof currentVal !== 'string') return;

    // Skip if already a Cloudinary or full external HTTPS URL
    if (currentVal.startsWith('https://res.cloudinary.com') || currentVal.includes('cloudinary.com')) {
      totalAlreadyCloud++;
      return;
    }

    // Check if it represents a local upload
    const normalized = currentVal.replace(/\\/g, '/');
    if (!normalized.includes('uploads/')) {
      return;
    }

    const filename = normalized.split('uploads/').pop().replace(/^\/+/, '');
    const localFilePath = path.join(uploadsDir, filename);

    if (!fs.existsSync(localFilePath)) {
      console.warn(`[${modelName} - ${doc._id}] Local file not found: uploads/${filename}. Preserving existing record.`);
      totalMissingFiles++;
      return;
    }

    try {
      console.log(`Uploading ${filename} to Cloudinary...`);
      const cleanBaseName = path.parse(filename).name.replace(/[^a-zA-Z0-9_-]/g, '_');
      const result = await cloudinary.uploader.upload(localFilePath, {
        folder: 'ojalis-yoga',
        public_id: `${cleanBaseName}-${Date.now()}`,
        resource_type: 'image'
      });

      doc[fieldName] = result.secure_url;
      await doc.save();
      totalMigrated++;
      console.log(`✓ [${modelName} - ${doc._id}] Migrated ${fieldName} -> ${result.secure_url}`);
    } catch (uploadErr) {
      console.error(`✗ [${modelName} - ${doc._id}] Cloudinary upload failed:`, uploadErr.message);
    }
  }

  // 1. Migrate Journals
  const journals = await Journal.find({});
  for (const doc of journals) {
    if (doc.featuredImage) await migrateField(doc, 'featuredImage', 'Journal');
  }

  // 2. Migrate Studio Photos
  const studioItems = await Studio.find({});
  for (const doc of studioItems) {
    if (doc.image) await migrateField(doc, 'image', 'Studio');
  }

  // 3. Migrate Teachers
  const teachers = await Teacher.find({});
  for (const doc of teachers) {
    if (doc.profileImage) await migrateField(doc, 'profileImage', 'Teacher');
  }

  // 4. Migrate Events
  const events = await Event.find({});
  for (const doc of events) {
    if (doc.image) await migrateField(doc, 'image', 'Event');
  }

  console.log('\n--- Migration Summary ---');
  console.log(`Total fields scanned: ${totalScanned}`);
  console.log(`Successfully migrated to Cloudinary: ${totalMigrated}`);
  console.log(`Already on Cloudinary: ${totalAlreadyCloud}`);
  console.log(`Files missing on local disk (preserved): ${totalMissingFiles}`);
  console.log('Migration complete!\n');

  process.exit(0);
}

runMigration().catch((err) => {
  console.error('Migration encountered fatal error:', err);
  process.exit(1);
});
