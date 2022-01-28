var utils = require('../utils/utils')
var mongoose = require('mongoose');
var cabDB = require('../db/cab.db')
var cabBookDB = require('../db/cabBook.db')
var cabCityStateDB = require('../db/cabCityState.db')
var cabHistoryDB = require('../db/cabHistory.db')
var logger = require('../conf/loggerConfig');


exports.bookCab = function (req, res) {
  return new Promise(function (resolve, reject) {
      logger.info("In bookCab service. ")
      var fromCity = mongoose.Types.ObjectId(req.body.fromcity);
      var toCity = mongoose.Types.ObjectId(req.body.tocity);
      logger.info("The from City Object = "+JSON.stringify(fromCity))
      cabCityStateDB.getAllIdleCabs(fromCity).then((result) => {
            var selectedCab;
            logger.info("Idle Cabs List = "+JSON.stringify(result))
            if(result.length == 0){
                resolve({
                          message: "No Cab available. Please try again.",
                          statusCode: 200
                      })
            } else if (result.length == 1){
                //select the cab for booking
                selectedCab = result[0];
            } else {
                selectedCab = result[0];
                  /*var j = 1;
                  for(var i = 0; i < result.length-1; i++) {
                     console.log("console -> "+result[i].idleAt.getTime()+" - "+result[j].idleAt.getTime)
                     //if(result[i].idleAt >= result[j].idleAt){
                        console.log("console -> "+(result[i].idleAt.getTime() < result[j].idleAt.getTime()))
                     //}
                     j=j+1;
                  }*/
            }
            selectedCab.state = "ONTRIP"
            selectedCab.idleAt = null;
            cabCityStateDB.updateCabCityState(selectedCab).then((result) => {
                logger.info("after update = "+JSON.stringify(result))
                var cabBook = {}
                cabBook.cabId = selectedCab.cabId;
                cabBook.status = "CONFIRMED";
                cabBook.srcCity = fromCity;
                cabBook.destCity = toCity;
                cabBook.bookingTime = new Date();
                cabBookDB.createBooking(cabBook).then((result) => {
                        var rideBookingTime = result.bookingTime
                        cabHistoryDB.updateCabHistory(selectedCab.cabId, "IDLE").then((result) => {
                            /*logger.info("after BOOKING = "+JSON.stringify(result))
                            resolve(result);*/
                            var cabHistory={}

                            cabHistory.cabId = selectedCab.cabId;
                            cabHistory.state = "ONTRIP"
                            cabHistory.srcCity = fromCity
                            cabHistory.destCity = toCity
                            cabHistory.startTime = rideBookingTime
                            cabHistory.endTime = ""
                            cabHistory.active = true

                            cabHistoryDB.saveCabHistory(cabHistory).then((result) => {
                                logger.info("after BOOKING = "+JSON.stringify(result))
                                resolve({
                                    message: "Booking Confirmed",
                                    statusCode: 200
                                });
                            },
                            (error) => {
                                reject(error)
                            });
                        },
                        (error) => {
                            reject(error)
                        });


                },(error) => {
                    reject(error)
                });

            },(error) => {
                reject(error)
            });

      },(error) => {
          reject(error)
      });

  })
}



exports.endTrip = function (req, res) {
  return new Promise(function (resolve, reject) {
      logger.info("In bookCab service. ")

      var bookingId = mongoose.Types.ObjectId(req.body.bookingId);

      cabBookDB.updateBooking(bookingId).then((result) => {
            logger.info("Booking details "+JSON.stringify(result));
            var cabId = result[0].cabId;
            var destCity = result[0].destCity
          cabHistoryDB.updateCabHistory(cabId, "ONTRIP").then((result) => {
            var cabHistory={}

            cabHistory.cabId = cabId;
            cabHistory.state = "IDLE";
            cabHistory.srcCity = destCity
            cabHistory.startTime = new Date()
            cabHistory.endTime = ""
            cabHistory.active = true

            cabHistoryDB.saveCabHistory(cabHistory).then((result) => {
                logger.info("added History after trip end = "+JSON.stringify(result))
                cabCityStateDB.updateCabState(cabId, destCity).then((result) => {
                    logger.info("added History after trip end = "+JSON.stringify(result))
                    resolve({
                        message: "Trip Ended",
                        statusCode: 200
                    });
                },
                (error) => {
                    reject(error)
                });
            },
            (error) => {
                reject(error)
            });
          },
          (error) => {
              reject(error)
          });
      },
      (error) => {
          reject(error)
      });


  })
}
