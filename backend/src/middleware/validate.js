const { z } = require('zod');

// Shared schemas — mirrored on the frontend for client-side validation
const BookingSchema = z.object({
  expeditionId: z.string().min(1, 'Expedition is required'),
  package: z.enum(['BASIC', 'PRO', 'EXTREME']),
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
});

const InquirySchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

/**
 * Returns an Express middleware that validates req.body against the given
 * Zod schema. On failure, responds 400 with a structured list of field errors.
 */
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const fieldErrors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: fieldErrors,
      });
    }

    req.validatedBody = result.data;
    next();
  };
}

module.exports = { validate, BookingSchema, InquirySchema };
