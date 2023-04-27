const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  res.json({ message: 'finished' });
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'finished' });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'finished' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'finished' });
});

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'finished' });
});

module.exports = router;
