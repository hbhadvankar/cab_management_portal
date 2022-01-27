var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var cabCityState = require('../model/cabCityState.model');
var logger = require('../conf/loggerConfig');


exports.mapCabCity = function (newCabCityStateArr) {
    return new Promise((resolve, reject) => {
          logger.info('In Map cap city state db');
          cabCityState.insertMany(newCabCityStateArr, function(err, result) {
                 if (err) {
                     logger.error('Error when creating in object %j'+err);
                     reject({
                         message: "Internal Server Error",
                         httpStatusCode: 500
                     })
                     return;
                 } else {
                     resolve(result)
                 }
             });
    })
}


exports.findCabs = function (cabIdArr) {
    return new Promise((resolve, reject) => {
        cabCityState.find({cabId: {$in: cabIdArr}}).populate().exec((err, data)=>{
                        if(err){
                            reject(err.message);
                        }
                        else{
                            logger.info("Data from find() - "+JSON.stringify(data));
                            resolve(data);
                        }
                    })
    })
}

exports.getAllIdleCabs = function (fromCity) {
    return new Promise((resolve, reject) => {
        cabCityState.find({cityId: fromCity, state: "IDLE"}).sort({idleAt: 'ascending'}).exec((err, data)=>{
                        if(err){
                            reject(err.message);
                        }
                        else{
                            logger.info("Data from find() - "+JSON.stringify(data));
                            resolve(data);
                        }
                    })
    })
}


exports.updateCabCityState = function (selectedCab) {
    return new Promise((resolve, reject) => {
        logger.info("selectedCab - > "+JSON.stringify(selectedCab))
        cabCityState.findOneAndUpdate({cabId: selectedCab.cabId}, selectedCab, { upsert: true }, (err, result) => {
            if (err) {
                logger.error('Error when creating in object %j'+err);
                reject({
                    message: "Internal Server Error",
                    httpStatusCode: 500
                })
                return;
            } else {
                logger.info("the new result "+JSON.stringify(result));
                resolve(result)
            }
        });
    })
}

exports.updateCabState = function (cabId, destCity) {
    return new Promise((resolve, reject) => {
        var newIdleDate = new Date();
        cabCityState.updateOne({cabId:cabId}, { $set: { state: "IDLE" , cityId:destCity, idleAt : newIdleDate}}, (err, result)=> {
            if (err) {
                logger.error('Error when creating in object %j'+err);
                reject({
                    message: "Internal Server Error",
                    httpStatusCode: 500
                })
                return;
            } else {
                        resolve(result)
                }

        });
    })
}