/**
 * Require dependencies
 */
var mongoose = require('mongoose');
var contact = mongoose.model('Contact');

/**
 * Function used for sending responses in JSON
 * format
 */
var sendJsonResponse = funrtion(res, status, content) {
  res.status(status);
  res.json(content);
};
