/**
 * Require dependencies
 */
var mongoose = require('mongoose');
var contact = mongoose.model('Contact');

/**
 * Function used for sending responses in JSON
 * format
 */
var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/**
 * Dummy data for testing
 */
var respObj = {
  name: "Randy",
  age: 33,
  address: "kng 6"
}
/**
 * Controller for getting contacts
 */
module.exports.getContactList = function(req, res) {
  sendJsonResponse(res, 200, respObj);
}

module.exports.createContact = function(req, res) {
  sendJsonResponse(res, 200, respObj);
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
