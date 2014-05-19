var express = require('express');
var router = express.Router();
var wine = require('../../controllers/wine.js');

router.route('/')
    .get(wine.listing);

router.route('/:id')
    .get()
    .put();

module.exports = router;