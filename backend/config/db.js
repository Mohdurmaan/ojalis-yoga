const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || process.env.MONGODB_URI_ATLAS || process.env.MONGO_URI;

  if (!uri) {
    console.error('Database Error: Neither MONGODB_URI nor MONGO_URI is defined in environment variables.');
    return;
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
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`MongoDB Connected Successfully! Host: ${conn.connection.host} | Database: ${conn.connection.name}`);

    // Auto-seed admin user if missing
    try {
      const User = require('../models/User');
      const adminExists = await User.findOne({ role: 'admin' });
      if (!adminExists) {
        await User.create({
          name: 'Ojalis Administrator',
          email: 'admin@ojalis.com',
          password: 'admin123',
          role: 'admin'
        });
        console.log('Default admin initialized: admin@ojalis.com / admin123');
      }
    } catch (seedErr) {
      console.warn('Admin seed check:', seedErr.message);
    }
  } catch (error) {
    console.warn(`MongoDB Connection Error (${uri.startsWith('mongodb+srv') ? 'Atlas' : 'Primary'}): ${error.message}`);
    
    // Automatic fallback to local MongoDB if Atlas connection is blocked/unreachable
    if (uri.startsWith('mongodb+srv://')) {
      console.log('Attempting automatic fallback to Local MongoDB (mongodb://127.0.0.1:27017/ojalisyoga)...');
      try {
        const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/ojalisyoga', {
          serverSelectionTimeoutMS: 3000,
        });
        console.log(`MongoDB Connected Successfully (Local Fallback)! Host: ${localConn.connection.host} | Database: ${localConn.connection.name}`);
        return;
      } catch (localErr) {
        console.error(`Local MongoDB fallback also failed: ${localErr.message}`);
      }
    }
    console.error(`MongoDB connection could not be established immediately (${error.message}). Retrying in 5 seconds...`);
    setTimeout(connectDB, 5000);
  }
};

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB runtime error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected. Attempting to reconnect...');
});

module.exports = connectDB;

