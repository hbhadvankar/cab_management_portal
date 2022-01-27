var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var cityModel = require('../model/city.model');
var logger = require('../conf/loggerConfig');

exports.saveCity = function (city) {
    return new Promise((resolve, reject) => {
        logger.info("CITY - > "+city.name)

        cityModel.findOneAndUpdate({name: city.name}, city, { upsert: true }, (err, result) => {
            if (err) {
                logger.error('Error when creating in object %j'+err);
                reject({
                    message: "Internal Server Error",
                    httpStatusCode: 500
                })
                return;
            } else {
                logger.info("the new city"+JSON.stringify(result));
                resolve({
                    message: "Success",
                    state: "CREATED",
                    httpStatusCode: 201
                })
            }
        });
    })
}


exports.getCity = function (rollNumber) {
    return new Promise((resolve, reject) => {
        logger.info("in getCity db");
        cityModel.find().populate().exec((err, data)=>{
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
