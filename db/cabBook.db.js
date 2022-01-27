var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var cabBookModel = require('../model/cabBook.model');
var logger = require('../conf/loggerConfig');

exports.createBooking = function (cabBook) {
    return new Promise((resolve, reject) => {
        logger.info("cab book - > "+JSON.stringify(cabBook))

        cabBookModel.create(cabBook, (err, newCab) => {
            if (err) {
                logger.info('Error when creating in object %j'+err);
                reject({
                    message: "Internal Server Error",
                    httpStatusCode: 500
                })
                return;
            } else {
                resolve(newCab)
            }
        });
    })
}


exports.updateBooking = function (bookingId) {
    return new Promise((resolve, reject) => {
        logger.info("cab book id - > "+JSON.stringify(bookingId))

        cabBookModel.update({_id:bookingId}, { $set: { status: 'CLOSED' }}, (err, result)=> {
            if (err) {
                logger.error('Error when creating in object %j'+err);
                reject({
                    message: "Internal Server Error",
                    httpStatusCode: 500
                })
                return;
            } else {
                cabBookModel.find({_id:bookingId}).populate().exec((err, data)=>{
                    if (err) {
                        logger.error('Error when fetching in object %j'+err);
                        reject({
                            message: "Internal Server Error",
                            httpStatusCode: 500
                        })
                        return;
                    } else {

                        resolve(data)
                    }
                });
            }
        });
    })
}
