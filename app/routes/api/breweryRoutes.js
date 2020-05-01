const express = require('express');
const router = express.Router();

const BreweryController = require('../../controller/breweryController');
const breweryController = new BreweryController();

router.get('/', function (req, res) {
    breweryController.findAll(res);
});

router.get('/near', function (req, res) {
    console.log('test-breweryRoute')
    breweryController.findInRadius(req, res)
});

router.get('/:id', function (req, res) {
    breweryController.findById(req, res)
});


module.exports = router;