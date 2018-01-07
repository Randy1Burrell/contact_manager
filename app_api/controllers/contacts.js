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
            console.log(status);
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
    if (Object.keys(req.body).length === 0) {
        badRequest.message = "Invalid request",
        sendJsonResponse(res, 400, badRequest);
    } else {
        var requestValidation = parseReqBody(req);
        if (requestValidation.bad) {
            badRequest.message = 'Missing are ' + requestValidation.message;
            sendJsonResponse(res, 400, badRequest);
        } else {
            contact.create({
                    firstname: "Gandy",
                    lastname: "Burrell",
                    address: ["64 Sandhurst Cres"],
                    email: ["rb@randyburrell.info"]
                },
                function(err, result) {});
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
