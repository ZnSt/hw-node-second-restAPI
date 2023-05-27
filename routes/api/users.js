const express = require('express');
const router = express.Router();
const getCurrentController = require('../../controllers/getCurrent-controllers');
const updateController = require('../../controllers/updateAvatar-controller');
const verifyToken = require('../../controllers/verifyEmail-controllers');
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');

router.get('/current', auth, getCurrentController.getCurrent);
router.patch('/avatars', auth, upload.single('avatar'), updateController.updateAvatar);
router.get('/verify/:verificationToken', verifyToken.verifyEmail);

module.exports = router;
