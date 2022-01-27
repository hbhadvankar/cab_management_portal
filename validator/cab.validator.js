
var logger = require('../conf/loggerConfig');

module.exports.validateRegisterCabReq = function validateRegisterCabReq (req, res, next) {

  return new Promise(function (resolve, reject) {
        logger.info("in Validate /registerCab request")
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
          logger.info('Request body is missing!');
          resolve({
              message: "Request Body Empty",
              statusCode: 422
          });
        } else if (req.body.name == undefined || req.body.name == ""){
           resolve({
               message: "cab name is Empty",
               statusCode: 422
           });
        } else if (req.body.type == undefined || req.body.type == ""){
           resolve({
               message: "cab type is Empty",
               statusCode: 422
           });
        } else if (req.body.color == undefined || req.body.color == ""){
           resolve({
               message: "cab color is Empty",
               statusCode: 422
           });
        } else if (req.body.cabNumber == undefined || req.body.cabNumber == ""){
           resolve({
               message: "cab number is Empty",
               statusCode: 422
           });
        } else {
            resolve({
                message: "Validation passed",
                statusCode: 200
            });
        }
    })
};