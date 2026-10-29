const { PrismaClient } = require('@prisma/client');
const { asyncHandler } = require('../middleware/errorHandler');
const { sendInquiryNotification } = require('../services/emailService');

const prisma = new PrismaClient();

// POST /api/inquiries
const createInquiry = asyncHandler(async (req, res) => {
  const data = req.validatedBody;

  const inquiry = await prisma.inquiry.create({ data });

  try {
    await sendInquiryNotification(inquiry);
  } catch (err) {
    console.error('[inquiryController] Failed to send notification email:', err.message);
  }

  res.status(201).json({ success: true, data: inquiry });
});

module.exports = { createInquiry };
