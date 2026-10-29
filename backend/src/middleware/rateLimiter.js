const rateLimit = require('express-rate-limit');

// General API rate limit — generous, protects against scraping/abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again later.',
  },
});

// Stricter limit for form submissions (bookings, inquiries) to deter spam
const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many submissions. Please wait before trying again.',
  },
});

module.exports = { apiLimiter, writeLimiter };
