const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');
const bookSessionRoutes = require('./routes/bookSessionRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const studioRoutes = require('./routes/studioRoutes');
const eventRoutes = require('./routes/eventRoutes');
const eventBookingRoutes = require('./routes/eventBookingRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const fs = require('fs');

const app = express();

// Ensure uploads directory exists on server startup
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Flexible CORS setup for local dev and production
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(',').map((url) => url.trim().replace(/\/+$/, ''))
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes('*') ||
      allowedOrigins.includes(origin) ||
      allowedOrigins.some((allowed) => allowed && origin.startsWith(allowed))
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS error: Origin ${origin} not allowed`));
  },
  credentials: true
}));

// Static folder for uploads
app.use('/uploads', express.static(uploadsDir));


// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/journals', journalRoutes);
app.use('/api/admin/journals', journalRoutes);
app.use('/api/studio', studioRoutes);
app.use('/api/admin/studio', studioRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/event-bookings', eventBookingRoutes);
app.use('/api/admin/events', eventRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin/teachers', teacherRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);


// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Ojalis Yoga API is running...' });
});

// Health check endpoint for deployment monitoring
app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Book Session routes
app.use('/api/book-sessions', bookSessionRoutes);

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
  console.log(`Server running on port ${PORT}`);
});
