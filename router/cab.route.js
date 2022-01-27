var express = require('express');
var logger = require('../conf/loggerConfig');
var router = express.Router();

var cabController = require('../controllers/cab.controller')

router.get('/', cabController.getCabs);
router.post('/registerCab', cabController.registerCab);


module.exports = router;