var randomString = require('random-string');
var logger = require('../conf/loggerConfig');

exports.getRandomString = function (fileName) {
    return new Promise((resolve, reject) => {
        var x = randomString({
          length: 8,
          numeric: true,
          letters: true,
          special: false,
          exclude: ['a', 'b', '1']
        });
        logger.info("the random string"+x);
        resolve(x);
    })
}