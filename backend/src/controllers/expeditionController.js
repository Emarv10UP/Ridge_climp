const { PrismaClient } = require('@prisma/client');
const { asyncHandler } = require('../middleware/errorHandler');

const prisma = new PrismaClient();

// GET /api/expeditions?difficulty=BEGINNER
const getExpeditions = asyncHandler(async (req, res) => {
  const { difficulty } = req.query;

  const where = {};
  if (difficulty) {
    const valid = ['BEGINNER', 'INTERMEDIATE', 'EXPERT'];
    const normalized = String(difficulty).toUpperCase();
    if (!valid.includes(normalized)) {
      return res.status(400).json({
        success: false,
        error: `difficulty must be one of: ${valid.join(', ')}`,
      });
    }
    where.difficulty = normalized;
  }

  const expeditions = await prisma.expedition.findMany({
    where,
    orderBy: { createdAt: 'asc' },
  });

  res.json({ success: true, data: expeditions });
});

// GET /api/expeditions/featured
const getFeaturedExpeditions = asyncHandler(async (req, res) => {
  const expeditions = await prisma.expedition.findMany({
    where: { featured: true },
    orderBy: { createdAt: 'asc' },
  });

  res.json({ success: true, data: expeditions });
});

// GET /api/expeditions/:slug
const getExpeditionBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const expedition = await prisma.expedition.findUnique({ where: { slug } });

  if (!expedition) {
    return res.status(404).json({ success: false, error: 'Expedition not found' });
  }

  res.json({ success: true, data: expedition });
});

module.exports = { getExpeditions, getFeaturedExpeditions, getExpeditionBySlug };
