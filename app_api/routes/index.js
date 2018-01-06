var express = require('express');
var router = express.Router();

/*
 * var ctrlLocations = require('../controllers/locations');
 * var ctrlReviews = require('../controllers/reviews');
 * var ctrlAuth = require('../controllers/authentication');
 */

var sendJsonResponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};


var respObj = {
  name: "Randy",
  age: 33,
  address: "kng 6"
}
router.get(
  '/contact',
  function(req, res) {
    sendJsonResponse(res, 200, respObj);
  }
);

router.post(
  '/contact',
  function(req, res) {
    sendJsonResponse(res, 200, respObj);
  }
);

router.get(
  '/contact/:contactid',
  function(req, res) {
    sendJsonResponse(res, 200, respObj);
  }
);

router.put(
  '/contact/:contactid',
  function(req, res) {
    sendJsonResponse(res, 200, respObj);
  }
);

router.delete(
  '/contact/:contactid',
  function(req, res) {
    sendJsonResponse(res, 200, respObj);
  }
);

module.exports = router;
