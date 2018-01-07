/**
 * Author: Randy Burrell
 *
 * Date Created: 2018-01-06 YYYY-MM-DD
 *
 * Description: this file is the entry point
 * to the API's database scheme
 */

/**
 * Import mongoose lib for controlling mongodb
 */
mongoose = require('mongoose');

/**
 * Create connection string to mongodb
 */
var dbURI = 'mongodb://localhost/contacts';
/**
 * Set connection string to a different URI
 * when in production. For this to happen
 * MONGOLAB_URI must be set in .env file.
 * If no .env file is present in project,
 * then create on. Please set NODE_ENV to
 * production when using MONGOLAB_URI in
 * .env file. These are key, value pairs,
 * for example NODE_ENV = production
 */
if (process.env.NODE_ENV === 'production') {
  if (process.env.MONGOLAB_URI) {
    /**
     * Setting dbURI to connection string
     * that should be in .env files key
     * value pair. MONGOLAB_URI = URI
     */
    dbURI = process.env.MONGOLAB_URI;
  } else {
    /**
     * If MONGOLAB_URI was not set in .env
     * file then revert to default URI
     */
    dbURI = 'mongodb://localhost/contacts';
  }
}

/**
 * Try connecting to mongodb using
 * the URI set in dbURI
 */
mongoose.connect(dbURI);

/**
 * Sends message to console if connection
 * has been made
 */
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
  }):

  /**
   * Include necessary schema into database
   */
  require('contacts');
