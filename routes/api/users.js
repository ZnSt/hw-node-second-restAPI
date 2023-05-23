const express = require('express');
const router = express.Router();
const getCurrentController = require('../../controllers/getCurrent-controllers');
const updateController = require('../../controllers/updateAvatar-controller');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

router.get('/current', auth, getCurrentController.getCurrent);
router.patch('/avatars', auth, upload.single('avatar'), updateController.updateAvatar);

module.exports = router;
