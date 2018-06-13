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
var dbURI = 'mongodb://localhost:8081/contacts';
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
    dbURI = 'mongodb://localhost:8081/contacts';
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
});

/**
 * Listen for connection error when connecting/connected
 * to mongodb and logs error to console
 */
mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

/**
 * Listen for disconnection from mongodb and logs
 * message to console
 */
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

/**
 * Used to close connections to mongodb
 */
var gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    process.exit(0);
  });
};

/**
 * Used to close connections to mongodb when nodemon
 * restarts
 */
process.on('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});

/**
 * Used to close connections to mongodb when app
 * terminates
 */
process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});
/**
 * Used to close connections to mongodb when Heroku app
 * shutsdown
 */
process.on('SIGTERM', function () {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});

/**
 * Include necessary schema into database
 */
require('./contacts');
