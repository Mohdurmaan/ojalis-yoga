const fs = require('fs');
const path = require('path');
const backendDir = 'e:\\\\ujalishyoga\\\\backend';

const userContent = "const mongoose = require('mongoose');\n" +
"const bcrypt = require('bcryptjs');\n" +
"const userSchema = new mongoose.Schema({\n" +
"  email: { type: String, required: true, unique: true },\n" +
"  password: { type: String, required: true, minlength: 6, select: false }\n" +
"}, { timestamps: true });\n" +
"userSchema.pre('save', async function(next) {\n" +
"  if (!this.isModified('password')) next();\n" +
"  const salt = await bcrypt.genSalt(10);\n" +
"  this.password = await bcrypt.hash(this.password, salt);\n" +
"});\n" +
"userSchema.methods.matchPassword = async function(enteredPassword) {\n" +
"  return await bcrypt.compare(enteredPassword, this.password);\n" +
"};\n" +
"module.exports = mongoose.model('User', userSchema);\n";
fs.writeFileSync(path.join(backendDir, 'models', 'User.js'), userContent);

const authMidContent = "const jwt = require('jsonwebtoken');\n" +
"const User = require('../models/User');\n" +
"const protect = async (req, res, next) => {\n" +
"  let token;\n" +
"  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {\n" +
"    try {\n" +
"      token = req.headers.authorization.split(' ')[1];\n" +
"      const decoded = jwt.verify(token, process.env.JWT_SECRET);\n" +
"      req.user = await User.findById(decoded.id).select('-password');\n" +
"      next();\n" +
"    } catch (error) {\n" +
"      res.status(401).json({ success: false, message: 'Not authorized' });\n" +
"    }\n" +
"  }\n" +
"  if (!token) res.status(401).json({ success: false, message: 'Not authorized, no token' });\n" +
"};\n" +
"module.exports = { protect };\n";
fs.writeFileSync(path.join(backendDir, 'middleware', 'authMiddleware.js'), authMidContent);

const authCtrlContent = "const User = require('../models/User');\n" +
"const jwt = require('jsonwebtoken');\n" +
"const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });\n" +
"const loginUser = async (req, res, next) => {\n" +
"  try {\n" +
"    const { email, password } = req.body;\n" +
"    if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide an email and password' });\n" +
"    const user = await User.findOne({ email }).select('+password');\n" +
"    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });\n" +
"    const isMatch = await user.matchPassword(password);\n" +
"    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });\n" +
"    res.status(200).json({ success: true, token: generateToken(user._id) });\n" +
"  } catch (error) { next(error); }\n" +
"};\n" +
"const getMe = async (req, res, next) => {\n" +
"  try {\n" +
"    const user = await User.findById(req.user.id);\n" +
"    res.status(200).json({ success: true, data: user });\n" +
"  } catch (error) { next(error); }\n" +
"};\n" +
"const logoutUser = (req, res) => res.status(200).json({ success: true, message: 'Logged out successfully' });\n" +
"module.exports = { loginUser, getMe, logoutUser };\n";
fs.writeFileSync(path.join(backendDir, 'controllers', 'authController.js'), authCtrlContent);

const authRoutesContent = "const express = require('express');\n" +
"const { loginUser, getMe, logoutUser } = require('../controllers/authController');\n" +
"const { protect } = require('../middleware/authMiddleware');\n" +
"const router = express.Router();\n" +
"router.post('/login', loginUser);\n" +
"router.post('/logout', protect, logoutUser);\n" +
"router.get('/me', protect, getMe);\n" +
"module.exports = router;\n";
fs.writeFileSync(path.join(backendDir, 'routes', 'authRoutes.js'), authRoutesContent);

console.log('Auth files restored.');
