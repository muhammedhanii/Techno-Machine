const path = require('path');
const fs = require('fs/promises');
const express = require('express');

const router = express.Router();
const productsPath = path.resolve(__dirname, '../data/products.json');
const requestWindowMs = 60 * 1000;
const maxRequestsPerWindow = 60;
const requestBuckets = new Map();

const rateLimit = (req, res, next) => {
  const now = Date.now();
  const key = `${req.ip}:${req.path}`;
  const bucket = requestBuckets.get(key);

  if (!bucket || now - bucket.windowStart >= requestWindowMs) {
    requestBuckets.set(key, { windowStart: now, count: 1 });
    return next();
  }

  if (bucket.count >= maxRequestsPerWindow) {
    return res.status(429).json({ message: 'Too many requests. Please try again later.' });
  }

  bucket.count += 1;
  return next();
};

router.use(rateLimit);

router.get('/', async (_req, res) => {
  try {
    const content = await fs.readFile(productsPath, 'utf-8');
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ message: 'Failed to load products.', error: error.message });
  }
});

module.exports = router;
