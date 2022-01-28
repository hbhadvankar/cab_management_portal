var utils = require('../utils/utils')
var mongoose = require('mongoose');
var cabDB = require('../db/cab.db')
var cabCityStateDB = require('../db/cabCityState.db')
var cabHistoryDB = require('../db/cabHistory.db')
var logger = require('../conf/loggerConfig');


exports.mapCabCity = function (req, res) {
  return new Promise(function (resolve, reject) {
      logger.info("In mapCabCity service. ")
      var cabCityStateArray = req.body;
      getUniqueMapping(cabCityStateArray).then((newCabCityState) => {

         if(newCabCityState.length == 0){
             resolve({
                 message: "Mapping already done for Cabs.",
                 statusCode: 200
             })
         } else {
             cabCityStateDB.mapCabCity(newCabCityState).then((result) => {
                   if (result.statusCode == 422){
                       resolve(result);
                   } else {
                       var cabHistoryArr = [];
                       for(var i = 0; i < newCabCityState.length; i++) {
                           var obj = newCabCityState[i];
                           var cabHistory={}

                           cabHistory.cabId = mongoose.Types.ObjectId(obj.cabId);
                           cabHistory.state = obj.state
                           cabHistory.srcCity = mongoose.Types.ObjectId(obj.cityId);

                           cabHistory.startTime = obj.idleAt
                           cabHistory.endTime = ""
                           cabHistory.active = true

/*

                           logger.info("The Object "+i+" - "+JSON.stringify(obj))
                           logger.info("The Cab History "+i+" - "+JSON.stringify(cabHistory))
*/

                           cabHistoryArr.push(cabHistory);
                       }
                       //logger.info("The New Cab History Array = "+JSON.stringify(cabHistoryArr))
                       cabHistoryDB.saveCabHistoryArray(cabHistoryArr).then((result) => {
                           resolve(cabHistory);
                       },
                       (error) => {
                           reject(error)
                       });
                   }
             },
             (error) => {
                 reject(error)
             });
         }

      },(error) => {
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

function getUniqueMapping(cabCityStateArray) {
  return new Promise(function (resolve, reject) {
      logger.info("In post getCabs service. ")
      var newCabCityState=[]
      var cabIdArr=[]
      for(var i = 0; i < cabCityStateArray.length; i++) {
          var obj = cabCityStateArray[i];

          obj.cabId = mongoose.Types.ObjectId(obj.cabId);
          obj.cityId = mongoose.Types.ObjectId(obj.cityId);

          cabIdArr.push(mongoose.Types.ObjectId(obj.cabId));
          if (obj.state == "IDLE"){
            obj.idleAt = new Date();
            newCabCityState.push(obj)
          }
          //logger.info("The Object "+i+" - "+JSON.stringify(obj))

      }

      cabCityStateDB.findCabs(cabIdArr).then((result) => {
              //console.log("Before "+JSON.stringify(result))

              let newResult = newCabCityState.filter(newCabCityStateObj => !result.some(resultObj => JSON.stringify(resultObj.cabId) === JSON.stringify(newCabCityStateObj.cabId)));

                //console.log("After "+JSON.stringify(newResult))

              resolve(newResult);
          },(error) => {
                  reject(cabCityStateArray)
              }
      );
  })
}