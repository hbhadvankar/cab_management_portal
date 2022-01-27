const winston = require('winston');
const logLevel = 'debug';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: logLevel
        }),
        new winston.transports.File({
            //level: 'error',
            // Create the log directory if it does not exist
            level: logLevel,
            format: winston.format.json(),
            filename: './logs/combined.log'
        })
    ],
    format: winston.format.combine(
            winston.format.errors({stack: true}),
            winston.format.prettyPrint(),
            winston.format.splat(),
            winston.format.simple(),
            winston.format.label({label: 'Label'}),
            winston.format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
            winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
        )


});

module.exports = logger;

