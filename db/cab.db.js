var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var cabModel = require('../model/cab.model');
var logger = require('../conf/loggerConfig');


exports.saveCab = function (cab) {
    return new Promise((resolve, reject) => {
            cabModel.find({cabNumber: cab.cabNumber}).exec((err, data) => {
                if(err){
                    res.status(500).send(err.message);
                }
                else {
                    logger.info("Data ->"+JSON.stringify(data))
                    logger.info("Name Data ->"+data.name)
                    if (data.length > 0){
                        resolve({
                            message: "Cab Details Already Exits!",
                            statusCode: 422
                        })
                    } else {
                        cabModel.create(cab, (err, newCab) => {
                            if (err) {
                                logger.error('Error when creating in object %j'+err);
                                reject({
                                    message: "Internal Server Error",
                                    httpStatusCode: 500
                                })
                                return;
                            } else {
                                resolve(newCab)
                            }
                        });
                    }
                }
            })
    })
}


exports.getCabs = function (rollNumber) {
    return new Promise((resolve, reject) => {
        logger.info("in getCabs db");
        cabModel.find().populate().exec((err, data)=>{
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

