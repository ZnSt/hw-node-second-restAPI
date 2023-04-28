const { NotFound } = require('http-errors');
const Joi = require('joi');
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsOperations = require('../models/contacts');

const getAllContactsCtrl = async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
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
    const result = await contactsOperations.getContactById(id);
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
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
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
    const result = await contactsOperations.removeContact(contactId);
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
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateById(contactId, req.body);
    if (!result) {
      throw new NotFound(`Contact with id ${contactId} not found`);
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

module.exports = {
  getAllContactsCtrl,
  getContactByIdCtrl,
  addContactCtrl,
  deleteContactCtrl,
  updateByIdCtrl,
};
