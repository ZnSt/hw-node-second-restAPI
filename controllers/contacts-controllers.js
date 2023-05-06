const { NotFound } = require('http-errors');
const { default: mongoose } = require('mongoose');
const { Contact } = require('../models');
const { joiSchema, favoriteJoiSchema } = require('../models/contact');

const getAllContactsCtrl = async (_, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getContactByIdCtrl = async (req, res, next) => {
  try {
    const { contactId: id } = req.params;
    const result = await Contact.findById(id);
    if (!result) {
      throw new NotFound(`Contact with id ${id} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const addContactCtrl = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await Contact.create(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteContactCtrl = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw new NotFound(`Contact with id ${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Contact deleted',
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
};

const updateByIdCtrl = async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    try {
      const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
      res.json({
        status: 'success',
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        throw new NotFound(`Contact with id ${contactId} not found`);
      }
    }
  } catch (error) {
    next(error);
  }
};

const updateFavoriteFieldCtrl = async (req, res, next) => {
  try {
    const { error } = favoriteJoiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const { favorite } = req.body;
    try {
      const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
      res.json({
        status: 'success',
        code: 200,
        data: {
          result,
        },
      });
    } catch (error) {
      if (error instanceof mongoose.CastError) {
        throw new NotFound(`Contact with id ${contactId} not found`);
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  updateByIdCtrl,
  deleteContactCtrl,
  updateFavoriteFieldCtrl,
};
