var utils = require('../utils/utils')
var mongoose = require('mongoose');
var cabDB = require('../db/cab.db')
var cabHistoryDB = require('../db/cabHistory.db')
var logger = require('../conf/loggerConfig');

exports.getRandomName = function (req, res) {
  return new Promise(function (resolve, reject) {
      utils.getRandomString().then((result) => {
              resolve(result);
          },
              (error) => {
                  reject(error)
              }
      );
  })
}

exports.registerCab = function (req, res) {
  return new Promise(function (resolve, reject) {
      logger.info("In register Cab service. ")
      var cab = {};
      cab.name = req.body.name
      cab.type = req.body.type
      cab.color = req.body.color
      cab.cabNumber = req.body.cabNumber
      cabDB.saveCab(cab).then((result) => {
            if (result.statusCode == 422){
                resolve(result);
            } else {
                var cabHistory={}
                cabHistory.cabId = mongoose.Types.ObjectId(result._id);
                cabHistory.state = 'OFFLINE'
                //cabHistory.srcCity = ""
                //cabHistory.destCity = ""
                cabHistory.startTime = new Date();
                cabHistory.endTime = ""
                cabHistory.active = true
                cabHistoryDB.saveCabHistory(cabHistory).then((result) => {
                    resolve(result);
                },
                (error) => {
                    reject(error)
                });
            }
      },
      (error) => {
          reject(error)
      });
  })
}

exports.getCabs = function (req, res) {
  return new Promise(function (resolve, reject) {
      logger.info("In post getCabs service. ")
      cabDB.getCabs().then((result) => {
              resolve(result);
          },
              (error) => {
                  reject(error)
              }
      );
  })
}

