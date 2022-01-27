
var cabCityStateService = require('../service/cabCityState.service');
var cabValidator = require('../validator/cab.validator');
var logger = require('../conf/loggerConfig');


module.exports.mapCabCity = function mapCabCity (req, res, next) {
  logger.info("in controller /registerCab")

  cabCityStateService.mapCabCity(req, res).then(function (result) {
        res.json(result)
  }).catch(function (result) {
        res.status(400).json(result)
  });

};

