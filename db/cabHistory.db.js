var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var cabHistoryModel = require('../model/cabHistory.model');
var logger = require('../conf/loggerConfig');


exports.saveCabHistory = function (cabHistory) {
    return new Promise((resolve, reject) => {
        logger.info("In Cab History db")
        cabHistoryModel.create(cabHistory, (err, newCabHistory) => {
            if (err) {
                logger.error('Error when creating in object %j', err);
                reject({
                    message: "Internal Server Error",
                    httpStatusCode: 500
                })
            } else {
                logger.info("the new cabHistory "+JSON.stringify(newCabHistory));
                //resolve(newCab)
                resolve({
                    message: "Success",
                    state: "CREATED",
                    httpStatusCode: 201
                })
            }
        });
    })
}


exports.saveCabHistoryArray = function (cabHistoryArr) {
    return new Promise((resolve, reject) => {
          logger.info('In cab history array db');
          cabHistoryModel.insertMany(cabHistoryArr, function(err, result) {
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

exports.updateCabHistory = function (cabId, state) {
    return new Promise((resolve, reject) => {
        logger.info("In Cab History db update")
        cabHistoryModel.find({cabId: cabId, state: state}).sort({startTime: 'descending'}).limit(1).exec((err, data)=>{
            if(err){
                reject(err.message);
            }
            else{
                var endDateTime = new Date();
                cabHistoryModel.updateOne({_id:data[0]._id}, { $set: { endTime: endDateTime }}, (err, result)=> {
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
            }
        })
    })
}