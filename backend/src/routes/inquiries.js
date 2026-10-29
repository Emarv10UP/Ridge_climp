const express = require('express');
const { createInquiry } = require('../controllers/inquiryController');
const { validate, InquirySchema } = require('../middleware/validate');
const { writeLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/', writeLimiter, validate(InquirySchema), createInquiry);

module.exports = router;
