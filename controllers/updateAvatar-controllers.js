const { User } = require('../models/user');
const path = require('path');
const fs = require('fs/promises');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatar = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  try {
    const resultUpload = path.join(avatarsDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    const avatarURl = path.join('public', 'avatars', originalname);
    await User.findByIdAndUpdate(req.user._id, { avatarURl });
  } catch (error) {
    await fs.unlink();
    throw error;
  }
};

module.exports = updateAvatar;
