var express = require('express');
var logger = require('../conf/loggerConfig');
var router = express.Router();

var cabBookController = require('../controllers/cabBook.controller')

router.post('/bookCab', cabBookController.bookCab);
router.post('/endTrip', cabBookController.endTrip);


module.exports = router;