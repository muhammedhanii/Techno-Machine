const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const requestWindowMs = 60 * 1000;
const maxRequestsPerWindow = 120;
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

app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/products'));
app.use('/api/contact', require('./routes/contact'));

if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve(__dirname, '../frontend/dist');
  app.use(express.static(distPath));
  app.get('*', rateLimit, (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
