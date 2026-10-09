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
