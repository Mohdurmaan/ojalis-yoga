const fs = require('fs');
const path = require('path');

const backendDir = 'e:\\ujalishyoga\\backend';

// Helper to create dirs
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Directories
ensureDir(path.join(backendDir, 'config'));
ensureDir(path.join(backendDir, 'controllers'));
ensureDir(path.join(backendDir, 'middleware'));
ensureDir(path.join(backendDir, 'models'));
ensureDir(path.join(backendDir, 'routes'));
ensureDir(path.join(backendDir, 'utils'));
ensureDir(path.join(backendDir, 'uploads'));

// .env.example
fs.writeFileSync(path.join(backendDir, '.env.example'), 
`PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ojalisyoga
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:5173
`);

// .env
fs.writeFileSync(path.join(backendDir, '.env'), 
`PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ojalisyoga
JWT_SECRET=super_secret_jwt_key_for_ojalis_yoga_admin
FRONTEND_URL=http://localhost:5173
`);

// config/db.js
fs.writeFileSync(path.join(backendDir, 'config', 'db.js'), 
`const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error connecting to MongoDB: \${error.message}\`);
    process.exit(1);
  }
};

module.exports = connectDB;
`);

// server.js
fs.writeFileSync(path.join(backendDir, 'server.js'), 
`const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Ojalis Yoga API is running...' });
});

// Centralized error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`);

console.log("Backend scaffolding complete.");
