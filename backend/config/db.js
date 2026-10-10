const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;

  if (!uri) {
    console.error('Database Error: Neither MONGODB_URI nor MONGO_URI is defined in environment variables.');
    process.exit(1);
  }

  // Fallback to Google / Cloudflare public DNS if SRV record resolution fails in Node.js
  if (uri.startsWith('mongodb+srv://')) {
    try {
      dns.setServers(['8.8.8.8', '1.1.1.1']);
    } catch (e) {
      // Ignore if not permitted
    }
  }

  try {
    const conn = await mongoose.connect(uri, {
      dbName: 'ojalisyoga',
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`MongoDB Connected Successfully! Host: ${conn.connection.host} | Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB runtime error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Attempting to reconnect...');
});

module.exports = connectDB;

