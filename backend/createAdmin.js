const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected.');

    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
      console.log('Usage: node createAdmin.js <email> <password>');
      process.exit(1);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists!');
      process.exit(1);
    }

    const user = await User.create({ email, password });
    console.log('Admin account created successfully:', user.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
