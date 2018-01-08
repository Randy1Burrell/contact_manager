/**
 * Author: Randy Burrell
 *
 * Date Created: 2018-01-06 YYYY-MM-DD
 *
 * Description: This file hold the controllers
 * for creating, upating, deleting and retrieving
 * contacts
 */

/**
 * Require dependencies
 */
var mongoose = require('mongoose');
var contact = mongoose.model('contacts');

/**
 * Message when a bad request is made
 */
var badRequest = {
  "message": "Invalid request",
  "usage": {
    "body": {
      "firstname": "string - required",
      "lastname": "string - required",
      "address": "array of string",
      "dob": "date of birth must be Date",
      "phoneNumber": "String of unique phone numbers space separated is required",
      "email": "String of unique emails spaces separated is required"
    }
  }
};

/**
 * Resource not found message
 */
var notFound = {
  "mesage": "The resource you are searching for was not found"
};

/**
 * Function used for sending responses in JSON
 * format
 */
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
/**
 * Checks is elements occur more than onces in array.
 * Will be used to ensure the a person's number only
 * occurs once when saving.
 */
var hasDuplicates = function(array) {
  return (new Set(array)).size !== array.length;
}

/**
 * Used to parse request body for creatContact
 * returns: JSON object
 */
var parseReqBody = function(req) {
  /**
   * Bad initialized to false.
   * Bad will be set to true if
   * any required variable is
   * missing
   */
  var bad = false;

  /**
   * Get a copy of the request body
   * for readability purpose (body
   * is easier to spot than req.body)
   */
  var body = req.body;

  /**
   * message to stores which variables are
   * missing
   */
  var message = [];

  /**
   * Run checks for missing variables in
   * request
   */
  if (body.firstname == null || body.firstname.length === 0) {
    bad = true;
    message.push('firstname');
  }

  if (body.lastname == null || body.lastname.length === 0) {
    bad = true;
    message.push('lastname');
  }

  var phoneNumber = body.phoneNumber;
  if (phoneNumber == null || phoneNumber.length === 0) {
    bad = true;
    message.push('phoneNumber');
  }

  var email = body.email;
  if (email == null || email.length === 0) {
    bad = true;
    message.push('email');
  }
  /**
   * Return JSon object
   */
  return {
    bad: bad,
    message: message.join(', ')
  };
};

/**
 * Validate phone numbers
 */
var phoneNumberValidation = function(p_number) {
  var bad = false;
  p_number.forEach(function(number) {
    number = number.replace(/[^\d]/g, '');
    if (number.length < 6 || number.length > 12) {
      bad = true;
    }
  });
  return bad;
};

/**
 * Validate email
 */
var emailValidation = function(email) {
  var bad = false;
  email.forEach(function(email_address) {
    if (!(/[\w.+-]+@[\w.+-]+\.[a-zA-Z0-9]{2,4}(,\s*)*/ig.test(email_address))) {
      console.log(email_address);
      bad = true;
    }
  });
  return bad;
};

/**
 * function used to create contact
 */
var contactCreator = function(req, res) {
  // Check if address has been given
  var address = (req.body.address) ? req.body.address.split(',') : '';
  // Check if dob has been given
  var dob = (req.body.dob) ? new Date(req.body.dob) : '';
  // Create contact when all checks have been passed
  contact
    .create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phoneNumber: req.body.phoneNumber.split(' '),
        address: address,
        dob: dob,
        email: req.body.email.split(' ')
      }, // Supply required callback to mongoose.create
      function(err, result) {
        /**
         * On error send error response
         * else return newly created object
         */
        if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 201, result);
        }
      });
};

/**
 * function used to dynamically
 * create or update contact
 * pass parameter 0 to create contact
 * or 1 to update contact as the option
 * param
 */
var contactCreateUpdate = function(req, res, option) {
  /**
   * Send bad request response if required
   * arguments have not bee received
   */
  if (Object.keys(req.body).length === 0) {
    badRequest.message = 'Invalid request';
    sendJsonResponse(res, 400, badRequest);
  } else {
    /**
     * Make check for all required arguments
     */
    var requestValidation = parseReqBody(req);
    var phoneNumber = req.body.phoneNumber.split(' ');
    var email = req.body.email.split(' ');
    if (requestValidation.bad) {
      // Send appropriate response
      badRequest.message = 'Missing are ' + requestValidation.message;
      sendJsonResponse(res, 400, badRequest);
    } else if (phoneNumberValidation(phoneNumber) || hasDuplicates(phoneNumber)) {
      // Send appropriate response in phone number is invalid
      badRequest.message = 'Phone number is invalid';
      sendJsonResponse(res, 400, badRequest);
    } else if (emailValidation(email) || hasDuplicates(email)) {
      // Send appropriate response on invalid email
      badRequest.message = "Email is incorrect";
      sendJsonResponse(res, 400, badRequest);
    } else {
      switch (option) {
        case 0:
          // Create contact
          contactCreator(req, res);
          break;
        case 1:
          // Update contact info
          updateContact(req, res);
          break;
        default:
          // Send bad request
          badRequest.message = "Invalid Create OR Update Request";
          sendJsonResponse(res, 404, badRequest);
      }
    }
  }
};

/**
 * Function used to update contact
 */
var updateContact = function(req, res) {
  if (!req.params.contactid) {
    sendJsonResponse(res, 404, notFound);
  } else {
    // Check if address has been given
    var address = (req.body.address) ? req.body.address.split(',') : '';
    // Check if dob has been given
    var dob = (req.body.dob) ? new Date(req.body.dob) : '';
    // Updae contact
    contact
      .findById(req.params.contactid)
      .select('firstname')
      .exec(function(err, contact) {
        if (!contact) {
          sendJsonResponse(res, 404, notFound);
        } else if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          contact.firstname = req.body.firstname;
          contact.lastname = req.body.lastname;
          contact.phoneNumber = req.body.phoneNumber.split(' ');
          contact.address = address;
          contact.dob = dob;
          contact.email = req.body.email.split(' ');

          contact.save(function(err, contact) {
            if (err) {
              sendJsonResponse(res, 400, err);
            } else {
              sendJsonResponse(res, 200, contact);
            }
          });
        }
      });
  }
};

/**
 * Controller for getting contacts
 */
module.exports.getContactList = function(req, res) {
  /**
   * Contact list response controller
   */
  var contactList = function(err, results, status) {
    if (err) {} else {
      sendJsonResponse(res, 200, results);
    }
  };
  /**
   * Find all contacts in database
   */
  contact.
  find({}).
  sort({
    firstname: 1
  }).
  exec(contactList);
}

module.exports.createContact = function(req, res) {
  contactCreateUpdate(req, res, 0);
}

module.exports.getContactInfo = function(req, res) {
  /**
   * Check for required request parameter
   * contactid
   */
  if (req.params && req.params.contactid) {
    contact
      .findById(req.params.contactid)
      .exec(function(err, contact) {
        if (!contact) {
          sendJsonResponse(res, 404, {
            "message": "Requested contact info was not found"
          });
        } else if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 200, contact);
        }
      });
  } else {
    sendJsonResponse(res, 404, notFound);
  }
}

module.exports.updateContactInfo = function(req, res) {
  contactCreateUpdate(req, res, 1);
}

module.exports.deleteContact = function(req, res) {
  if (!req.params.contactid) {
    sendJsonResponse(res, 400, {
      "message": "Contactid param is required"
    });
  } else {
    contact
      .findByIdAndRemove(req.params.contactid)
      .exec(function(err, contact) {
        if (!contact) {
          sendJsonResponse(res, 404, notFound);
        } else if (err) {
          sendJsonResponse(res, 400, err);
        } else {
          sendJsonResponse(res, 204, null);
        }
      });
  }
}
