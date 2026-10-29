const express = require('express');
const { createBooking, getBookingById } = require('../controllers/bookingController');
const { validate, BookingSchema } = require('../middleware/validate');
const { writeLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', writeLimiter, validate(BookingSchema), createBooking);
router.get('/:id', getBookingById);

module.exports = router;
