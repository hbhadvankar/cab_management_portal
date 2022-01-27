
var cityService = require('../service/city.service');
var cityValidator = require('../validator/city.validator');
var logger = require('../conf/loggerConfig');

module.exports.registerCity = function registerCity (req, res, next) {
  logger.info("in controller /registerCity")
  cityValidator.validateRegisterCityReq(req, res).then(function (result) {
          if (result.statusCode == 422) {
              res.status(result.statusCode).json(result)
          } else {
                  cityService.registerCity(req, res).then(function (result) {
                    res.json(result)
              }).catch(function (result) {
                    res.status(400).json(result)
              });
          }
      }).catch(function (result) {
            res.status(400).json(result)
      });
};


module.exports.getCity = function getCity (req, res, next) {
  logger.info("in controller /getCity")
      cityService.getCity(req, res).then(function (result) {
        res.status(200).json(result)
  }).catch(function (result) {
        res.status(400).json(result)
  });

};
