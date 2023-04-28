const express = require('express');
const router = express.Router();
const contactsControllers = require('../../controllers/contacts-controllers');

router.get('/', contactsControllers.getAllContactsCtrl);

router.get('/:contactId', contactsControllers.getContactByIdCtrl);

router.post('/', contactsControllers.addContactCtrl);

router.delete('/:contactId', contactsControllers.deleteContactCtrl);

router.put('/:contactId', contactsControllers.updateByIdCtrl);

module.exports = router;
