require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const expeditionRoutes = require('./routes/expeditions');
const bookingRoutes = require('./routes/bookings');
const inquiryRoutes = require('./routes/inquiries');
const { errorHandler } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const app = express();
const PORT = process.env.PORT || 4000;

// --- Core middleware ---
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(compression());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/api', apiLimiter);

// --- Health check ---
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});


app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    version: 'v2'
  });
});


// --- Routes ---
app.use('/api/expeditions', expeditionRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/inquiries', inquiryRoutes);

// --- 404 fallback ---
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// --- Error handler (must be last) ---
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`RidgeClimb API listening on port ${PORT}`);
});

module.exports = app;
