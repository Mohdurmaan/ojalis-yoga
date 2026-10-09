const fs = require('fs');
const path = require('path');

const backendDir = 'e:\\ujalishyoga\\backend';

// 1. models/User.js
fs.writeFileSync(path.join(backendDir, 'models', 'User.js'), 
`const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  }
}, { timestamps: true });

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
`);

// 2. middleware/authMiddleware.js
fs.writeFileSync(path.join(backendDir, 'middleware', 'authMiddleware.js'),
`const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
`);

// 3. controllers/authController.js
fs.writeFileSync(path.join(backendDir, 'controllers', 'authController.js'),
`const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear cookie (if using cookies)
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  loginUser,
  getMe,
  logoutUser
};
`);

// 4. routes/authRoutes.js
fs.writeFileSync(path.join(backendDir, 'routes', 'authRoutes.js'),
`const express = require('express');
const { loginUser, getMe, logoutUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);
router.get('/me', protect, getMe);

module.exports = router;
`);

// 5. Update server.js
const serverJsPath = path.join(backendDir, 'server.js');
let serverJsContent = fs.readFileSync(serverJsPath, 'utf8');

// Insert auth routes
const routeImport = \`const authRoutes = require('./routes/authRoutes');\\n\`;
const routeMount = \`\\n// Mount routers\\napp.use('/api/auth', authRoutes);\\n\`;

if (!serverJsContent.includes('/api/auth')) {
  serverJsContent = serverJsContent.replace("const app = express();", routeImport + "const app = express();");
  serverJsContent = serverJsContent.replace("// Basic route for testing", routeMount + "\\n// Basic route for testing");
  fs.writeFileSync(serverJsPath, serverJsContent);
}

// 6. createAdmin.js (safe initial admin creation script)
fs.writeFileSync(path.join(backendDir, 'createAdmin.js'),
`const mongoose = require('mongoose');
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
`);

console.log("Phase 4 scaffolding complete.");
