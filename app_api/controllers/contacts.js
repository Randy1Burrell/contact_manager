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
      "dob": "date of birth",
      "phoneNumber": "array of phone numbers -- required",
      "email": "array of email required"
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
  var phoneNumber = [];
  phoneNumber = p_number.split(' ');
  phoneNumber.forEach(function(number) {
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
  var eMail = [];
  eMail = email.split(' ');
  eMail.forEach(function(email_address) {
    if (!(/[\w.+-]+@[\w.+-]+\.[a-zA-Z0-9]{2,4}(,\s*)*/ig.test(email_address))) {
      console.log(email_address);
      bad = true;
    }
  });
  return bad;
};
/**
 * Dummy data for testing
 */
var respObj = {
  name: "Randy",
  age: 33,
  address: "kng 6"
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
    if (requestValidation.bad) {
      // Send appropriate response
      badRequest.message = 'Missing are ' + requestValidation.message;
      sendJsonResponse(res, 400, badRequest);
    } else if (phoneNumberValidation(req.body.phoneNumber) === true) {
      // Send appropriate response in phone number is invalid
      badRequest.message = 'Phone number is invalid';
      sendJsonResponse(res, 400, badRequest);
    } else if (emailValidation(req.body.email)) {
      // Send appropriate response on invalid email
      badRequest.message = "Email is incorrect";
      sendJsonResponse(res, 400, badRequest);
    } else {
      // Check if address has been given
      var address = '';
      if (req.body.address == null) {
        address = '';
      } else {
        address = req.body.address;
      }
      // Create contact when all checks have been passed
      contact.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          phoneNumber: req.body.phoneNumber.split(' '),
          address: address.split(' '),
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
    }
  }
}

module.exports.getContactInfo = function(req, res) {
  sendJsonResponse(res, 200, respObj);
}

module.exports.updateContactInfo = function(req, res) {
  sendJsonResponse(res, 200, respObj);
}

module.exports.deleteContact = function(req, res) {
  sendJsonResponse(res, 200, respObj);
}
