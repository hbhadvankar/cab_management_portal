
var logger = require('../conf/loggerConfig');

module.exports.validateRegisterCityReq = function validateRegisterCityReq (req, res, next) {

  return new Promise(function (resolve, reject) {
        logger.info("in Validate /registerCity request")
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
          logger.info('Request body is missing!');
          resolve({
              message: "Request Body Empty",
              statusCode: 422
          });
        } else if (req.body.name == undefined || req.body.name == ""){
           resolve({
               message: "city name is Empty",
               statusCode: 422
           });
        } else if (req.body.state == undefined || req.body.state == ""){
           resolve({
               message: "city state is Empty",
               statusCode: 422
           });
        } else if (req.body.country == undefined || req.body.country == ""){
           resolve({
               message: "city country is Empty",
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