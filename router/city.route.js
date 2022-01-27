var express = require('express');
var logger = require('../conf/loggerConfig');
var router = express.Router();

var cityController = require('../controllers/city.controller')

router.get('/', cityController.getCity);
router.post('/registerCity', cityController.registerCity);


module.exports = router;