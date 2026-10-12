const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, mobile, password, confirmPassword } = req.body;

    // 1. Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Full name is required' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: 'Email address is required' });
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    const contactPhone = (phone || mobile || '').trim();
    if (!contactPhone) {
      return res.status(400).json({ success: false, message: 'Mobile number is required' });
    }
    // Clean phone validation (at least 7 to 15 digits)
    const phoneDigits = contactPhone.replace(/\D/g, '');
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      return res.status(400).json({ success: false, message: 'Please provide a valid mobile number' });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: 'Password is required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // 2. Check for duplicate email
    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists' });
    }

    // 3. Create user (role defaults to 'user', never accept arbitrary role from client)
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      phone: contactPhone,
      password,
      role: 'user'
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const identifier = (req.body.email || req.body.identifier || req.body.phone || '').trim();
    const password = req.body.password;

    if (!identifier || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email or mobile number and password' });
    }

    const cleanIdentifier = identifier.toLowerCase();
    const phoneDigits = identifier.replace(/\D/g, '');

    // Allow matching either by email or by phone number (including variations of country code)
    const orQueries = [
      { email: { $regex: new RegExp(`^${cleanIdentifier.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
      { phone: identifier }
    ];

    if (phoneDigits && phoneDigits.length >= 7) {
      const lastDigits = phoneDigits.slice(-10);
      orQueries.push({ phone: { $regex: new RegExp(lastDigits + '$') } });
    }

    const user = await User.findOne({
      $or: orQueries
    }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your details.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Please verify your password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
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
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        createdAt: user.createdAt
      },
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, mobile, email } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Name update
    if (name !== undefined) {
      if (!name.trim()) {
        return res.status(400).json({ success: false, message: 'Name cannot be empty' });
      }
      user.name = name.trim();
    }

    // Phone update
    const newPhone = phone !== undefined ? phone : mobile;
    if (newPhone !== undefined) {
      const cleanPhone = newPhone.trim();
      const phoneDigits = cleanPhone.replace(/\D/g, '');
      if (cleanPhone && (phoneDigits.length < 7 || phoneDigits.length > 15)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid mobile number' });
      }
      user.phone = cleanPhone;
    }

    // Email update (with duplicate check)
    if (email !== undefined && email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const cleanEmail = email.trim().toLowerCase();
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
      }

      const existing = await User.findOne({ email: cleanEmail, _id: { $ne: user._id } });
      if (existing) {
        return res.status(400).json({ success: false, message: 'This email is already registered to another account' });
      }
      user.email = cleanEmail;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change user password
// @route   PUT /api/auth/change-password
// @access  Private
const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ success: false, message: 'Current password is required' });
    }
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }
    if (confirmNewPassword !== undefined && newPassword !== confirmNewPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    const user = await User.findById(req.user._id).select('+password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public / Private
const logoutUser = (req, res) => {
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile,
  changePassword,
  logoutUser
};
