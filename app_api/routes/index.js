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

// locations
router.get(
  '/contact',
  function(req, res){
    var respObj = {
      name: "Randy",
      age: 33,
      address: "kng 6"
    }
    sendJsonResponse(res, 200, respObj);
  }
);
/*
router.post(
    '/locations',
    ctrlLocations.locationsCreate
);
router.get(
    '/locations/:locationid',
    ctrlLocations.locationsReadOne
);
router.put(
    '/locations/:locationid',
    ctrlLocations.locationsUpdateOne
);
router.delete(
    '/locations/:locationid',
    ctrlLocations.locationsDeleteOne
);

// reviews
router.post(
    '/locations/:locationid/reviews',
    auth,
    ctrlReviews.reviewsCreate
);
router.get(
    '/locations/:locationid/reviews/:reviewid',
    ctrlReviews.reviewsReadOne
);
router.put(
    '/locations/:locationid/reviews/:reviewid',
    auth,
    ctrlReviews.reviewsUpdateOne
);
router.delete(
    '/locations/:locationid/reviews/:reviewid',
    auth,
    ctrlReviews.reviewsDeleteOne
);
router.post('/register',ctrlAuth.register);
router.post('/login', ctrlAuth.login);
*/
module.exports = router;

