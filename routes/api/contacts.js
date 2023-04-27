const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json({ message: 'done' });
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'done' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'done' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'done' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'done' });
});

module.exports = router;
