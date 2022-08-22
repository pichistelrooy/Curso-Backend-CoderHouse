const winston = require('winston');

const loggerDesarrollo = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console()
  ]
});

const loggerProduccion = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.File({ filename: 'winston_debug.log', level: 'debug' }),
    new winston.transports.File({ filename: 'winston_error.log', level: 'error' }),
  ]
});

const logger = process.env.NODE_ENV === 'PROD' ? loggerProduccion : loggerDesarrollo;

module.exports = logger;