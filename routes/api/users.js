const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const getCurrent = require('../../controllers/getCurrent-controllers');
const upload = require('../../middleware/upload');

router.get('/current', auth, getCurrent);
router.patch('/avatars', auth, upload.single('avatar'));

module.exports = router;
