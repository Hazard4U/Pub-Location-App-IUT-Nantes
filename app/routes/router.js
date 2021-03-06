const express = require('express');
const router = express.Router();

const REST_API_ROOT = '/api';

/* API routes */
router.use(REST_API_ROOT+'/categorie', require('./api/categorieRoutes'));
router.use(REST_API_ROOT+'/beer', require('./api/beerRoutes'));
router.use(REST_API_ROOT+'/brewery', require('./api/breweryRoutes'));

/* Web routes */
router.use('/', require('./api/webRoutes'));

module.exports = router;