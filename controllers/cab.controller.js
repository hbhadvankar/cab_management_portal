
var cabService = require('../service/cab.service');
var cabValidator = require('../validator/cab.validator');
var logger = require('../conf/loggerConfig');


module.exports.registerCab = function registerCab (req, res, next) {
  logger.info("in controller /registerCab")
  cabValidator.validateRegisterCabReq(req, res).then(function (result) {
        if (result.statusCode == 422) {
            res.status(result.statusCode).json(result)
        } else {
            cabService.registerCab(req, res).then(function (result) {
                  res.json(result)
            }).catch(function (result) {
                  res.status(400).json(result)
            });
        }
    }).catch(function (result) {
          res.status(400).json(result)
    });
};


module.exports.getCabs = function getCabs (req, res, next) {
  logger.info("in controller /getCabs")
      cabService.getCabs(req, res).then(function (result) {
        res.status(200).json(result)
  }).catch(function (result) {
        res.status(400).json(result)
  });

};

