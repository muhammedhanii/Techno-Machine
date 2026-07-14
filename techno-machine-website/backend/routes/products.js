const path = require('path');
const fs = require('fs/promises');
const express = require('express');

const router = express.Router();
const productsPath = path.resolve(__dirname, '../data/products.json');

router.get('/', async (_req, res) => {
  try {
    const content = await fs.readFile(productsPath, 'utf-8');
    res.json(JSON.parse(content));
  } catch (error) {
    res.status(500).json({ message: 'Failed to load products.', error: error.message });
  }
});

module.exports = router;
