/**
 * Author: Randy Burrell
 *
 * Date Created: 2018-01-06 YYYY-MM-DD
 *
 * Description: this file is the contains
 * schema for contacts
 */

/**
 * Getting required depandencies
 */
var mongoose = require('mongoose');

/**
 * Create new schema for contact
 * called contactSchema
 */
var contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
  },
  address: [{
    type: String
  }],
  phoneNumber: {
    type: [String],
    required: true
  },
  email: {
    type: [String],
    required: true
  },
});

/**
 * Compile contactSchema
 */
mongoose.model('Contact', contactSchema);
