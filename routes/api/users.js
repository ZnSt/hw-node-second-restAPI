const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const getCurrent = require('../../controllers/getCurrent-controllers');

router.get('/current', auth, getCurrent);

module.exports = router;
