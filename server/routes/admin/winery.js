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
/**
 * Adding review id to request object
 */
router.param('rid', function(req, res, next, rid) {

    var doc = req.doc;
    var review = doc.reviews.id(rid);
    if (review == 'undefined') {
        return next(Error('failed to load rid'));
    }
    req.rid = rid;
    next();
});

router.get('/', winery.listing);

router.route('/winery/:id/')
    .get(winery.adminShow)
    .put(winery.adminWineryChange)
    .delete(winery.adminWineryDelete);

router.get('/winery/:id/publish/', winery.adminPublish);

router.get('/winery/:id/reviews/', review.listing);

router.route('/winery/:id/reviews/:rid')
    .put(review.adminChange)
    .delete(review.adminDelete);

module.exports = router;