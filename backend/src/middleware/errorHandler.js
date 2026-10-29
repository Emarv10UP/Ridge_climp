/**
 * Centralized error handler. Any error passed to next(err) anywhere in the
 * app lands here. Keeps error shape consistent across the API.
 */
function errorHandler(err, req, res, next) {
  console.error(`[error] ${req.method} ${req.path} —`, err.message);

  // Prisma "record not found"
  if (err.code === 'P2025') {
    return res.status(404).json({ success: false, error: 'Resource not found' });
  }

  // Prisma unique constraint violation
  if (err.code === 'P2002') {
    return res.status(409).json({
      success: false,
      error: `A record with this ${err.meta?.target?.join(', ') || 'value'} already exists`,
    });
  }

  const status = err.status || 500;
  res.status(status).json({
    success: false,
    error: status === 500 ? 'Internal server error' : err.message,
  });
}

// Wraps async route handlers so rejected promises reach errorHandler
function asyncHandler(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

module.exports = { errorHandler, asyncHandler };
