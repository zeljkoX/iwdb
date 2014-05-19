var express = require('express'),
    router = express.Router(),
    wine = require('../../controllers/wine.js'),
    review = require('../../controllers/review.js'),
    mongoose = require('mongoose'),
    Wine = mongoose.model('Wine');
/**
 * Adding mongoose document to request object
 */
router.param('id', function(req, res, next, id) {
    Wine.find(id, function(err, doc) {
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
router.get('/', wine.listing);

router.route('/wine/:id/')
    .get(wine.adminShow)
    .put(wine.adminWineChange)
    .delete(wine.adminWineDelete);

router.get('/wine/:id/publish/', wine.adminPublish);


router.route('/wine/:id/reviews/')
    .get(review.listing)
    .put(review.adminChange)
    .delete(review.adminDelete);

router.route('/wine/:id/problem/')
    .get(wine.adminProblem)
    .delete(wine.adminProblemDelete);

module.exports = router;