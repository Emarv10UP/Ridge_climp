const express = require('express');
const {
  getExpeditions,
  getFeaturedExpeditions,
  getExpeditionBySlug,
} = require('../controllers/expeditionController');

const router = express.Router();

router.get('/featured', getFeaturedExpeditions);
router.get('/:slug', getExpeditionBySlug);
router.get('/', getExpeditions);

module.exports = router;
