
var cabBookService = require('../service/cabBook.service');
var cabValidator = require('../validator/cab.validator');
var logger = require('../conf/loggerConfig');


module.exports.bookCab = function bookCab (req, res, next) {
  logger.info("in controller /bookCab")

  cabBookService.bookCab(req, res).then(function (result) {
        res.json(result)
  }).catch(function (result) {
        res.status(400).json(result)
  });

};

module.exports.endTrip = function endTrip (req, res, next) {
  logger.info("in controller /endTrip")

  cabBookService.endTrip(req, res).then(function (result) {
        res.json(result)
  }).catch(function (result) {
        res.status(400).json(result)
  });

};