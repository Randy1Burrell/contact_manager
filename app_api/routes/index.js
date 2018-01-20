var express = require('express');
var router = express.Router();

var ctrlContacts = require('../controllers/contacts.js');

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


router.get(
  '/contact',
  ctrlContacts.getContactList
);

router.post(
  '/contact',
  ctrlContacts.createContact
);

router.get(
  '/contact/:contactid',
  ctrlContacts.getContactInfo
);

router.put(
  '/contact/:contactid',
  ctrlContacts.updateContactInfo
);

router.delete(
  '/contact/:contactid',
  ctrlContacts.deleteContact
);

module.exports = router;
