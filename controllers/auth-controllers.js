const { Conflict, Unauthorized } = require('http-errors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const { joiRegisterSchema, joiLoginSchema } = require('../models/user');
const { User } = require('../models');
const { sendEmail } = require('../helpers/sendEmail');
const { v4 } = require('uuid');

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const { error } = joiRegisterSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    verificationToken,
    avatarURL,
  });
  console.log('result: ', result);
  const mail = {
    to: email,
    subject: 'Accept invite',
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Hello my friend! Please, accept invite</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      user: {
        name,
        email,
        subscription,
        verificationToken,
        avatarURL,
      },
    },
  });
};

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const { error } = joiLoginSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const user = await User.findOne({ email });
  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !user.verify || !passCompare) {
    throw new Unauthorized('Email is wrong or not verify, or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
};

module.exports = {
  register,
  login,
  logout,
};
