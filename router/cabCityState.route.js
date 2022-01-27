var express = require('express');
var logger = require('../conf/loggerConfig');
var router = express.Router();

var cabController = require('../controllers/cabCityState.controller')

router.post('/mapCabCity', cabController.mapCabCity);


module.exports = router;