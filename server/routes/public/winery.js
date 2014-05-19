var express = require('express'),
    router = express.Router(),
    winery = require('../../controllers/winery.js'),
    review = require('../../controllers/review.js'),
    mongoose = require('mongoose'),
    Winery = mongoose.model('Winery');
/**
 * Adding mongoose document to request object
 */
router.param('id', function(req, res, next, id) {
    Winery.findById(id, function(err, doc) {
        if (err) {
            return next(err);
        } else if (!doc) {
            return next(new Error('failed to load user'));
        }

        req.id = doc._id;
        req.doc = doc;
        next();
    });
});
router.route('/')
    .get(winery.listing);

router.route('/winery/:id/:name/')
    .get(winery.show);

router.route('/winery/:id/')
    .get(winery.redirect);

router.route('/winery/:id/:name/edit/')
    .put(winery.edit);

router.route('/winery/:id/:name/reviews/')
    .get(review.listing);

router.route('/winery/:id/:name/reviews/')
    .post(review.add);

router.route('/winery/:id/:name/reviews/:rid/')
    .post(review.rate);

router.route('/winery/:id/:name/problem/')
    .post(winery.problem);




module.exports = router;