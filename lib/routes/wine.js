var express = require('express');
var router = express.Router();
var wine = require('../controllers/wine.js');

router.route('/')
    .get(wine.index)
    .post(wine.indexPost);

router.route('/:id')
    .get()
    .put();

module.exports = router;