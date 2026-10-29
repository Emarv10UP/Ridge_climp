const { PrismaClient } = require('@prisma/client');
const { asyncHandler } = require('../middleware/errorHandler');
const { sendBookingConfirmation } = require('../services/emailService');

const prisma = new PrismaClient();

// POST /api/bookings
const createBooking = asyncHandler(async (req, res) => {
  const data = req.validatedBody;

  const expedition = await prisma.expedition.findUnique({
    where: { id: data.expeditionId },
  });

  if (!expedition) {
    return res.status(404).json({ success: false, error: 'Expedition not found' });
  }

  const booking = await prisma.booking.create({ data });

  // Email failures shouldn't fail the booking itself — log and continue
  try {
    await sendBookingConfirmation(booking, expedition);
  } catch (err) {
    console.error('[bookingController] Failed to send confirmation email:', err.message);
  }

  res.status(201).json({ success: true, data: booking });
});

// GET /api/bookings/:id
const getBookingById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { expedition: true },
  });

  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  res.json({ success: true, data: booking });
});

module.exports = { createBooking, getBookingById };
