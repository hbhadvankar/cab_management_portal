var utils = require('../utils/utils')
var cityDB = require('../db/city.db')
var logger = require('../conf/loggerConfig');

exports.registerCity = function (req, res) {
  return new Promise(function (resolve, reject) {
      logger.info("In register City service. ")
      var city = {};
      city.name = req.body.name
      city.state = req.body.state
      city.country = req.body.country
      logger.info("The Object = ", JSON.stringify(city))
      cityDB.saveCity(city).then((result) => {
              resolve(result);
          },
              (error) => {
                  reject(error)
              }
      );
  })
}

exports.getCity = function (req, res) {
  return new Promise(function (resolve, reject) {
      logger.info("In get city service. ")

      cityDB.getCity().then((result) => {
              resolve(result);
          },
              (error) => {
                  reject(error)
              }
      );
  })
}
