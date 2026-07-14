const path = require('path');
const fs = require('fs/promises');
const express = require('express');

const router = express.Router();
const contactsPath = path.resolve(__dirname, '../data/contacts.json');
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

const ensureContactsFile = async () => {
  try {
    await fs.access(contactsPath);
  } catch {
    await fs.writeFile(contactsPath, '[]', 'utf-8');
  }
};

const readContacts = async () => {
  await ensureContactsFile();
  const content = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(content);
};

router.post('/', async (req, res) => {
  const name = req.body?.name?.trim();
  const phone = req.body?.phone?.trim();
  const email = req.body?.email?.trim() || '';
  const message = req.body?.message?.trim();

  if (!name || !phone || !message) {
    return res.status(400).json({
      message: 'Name, phone, and message are required.'
    });
  }

  try {
    const contacts = await readContacts();
    const entry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      name,
      phone,
      email,
      message,
      createdAt: new Date().toISOString()
    };

    contacts.push(entry);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');

    return res.status(201).json({
      success: true,
      message: 'Your request has been submitted successfully.',
      data: entry
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to save your request. Please try again later.',
      error: error.message
    });
  }
});

router.get('/', async (req, res) => {
  const providedKey = req.get('ADMIN_KEY') || req.get('x-admin-key');

  if (!process.env.ADMIN_KEY || providedKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized.' });
  }

  try {
    const contacts = await readContacts();
    return res.json({ success: true, data: contacts });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to load contacts.', error: error.message });
  }
});

module.exports = router;
