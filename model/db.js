var fs = require('fs');
var mongoose = require('mongoose');
var logger = require('../conf/loggerConfig');


//require database URL from environment
//var dbURL = process.env.dbURL;
var dbURL = "mongodb://127.0.0.1:27017/cab_management";


var options = {
    /* sslValidate: false,
    sslKey: key,
    sslCert: key,
    ssl: true, */
    useNewUrlParser: true,
    useUnifiedTopology: true
    /* ,
    user: '****',
    pass: '****' */
};



module.exports = function() {
    mongoose.connect(dbURL, options);
    //mongoose.set('useFindAndModify', false);

    mongoose.connection.on('connected', function() {
        //logger.info("Mongoose default connection is open to " + dbURL);
        logger.info("Mongoose default connection is open to " + dbURL);
    });

    mongoose.connection.on('error', function(err) {
        logger.error("Mongoose default connection has occured " + err + " error")
        //logger.error("Mongoose default connection has occured " + err + " error");
    });

    mongoose.connection.on('disconnected', function() {
          logger.error("Mongoose default connection is disconnected");
        //logger.warn("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function() {
        mongoose.connection.close(function() {
            //logger.info("Mongoose default connection is disconnected due to application termination");
            logger.error("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}
