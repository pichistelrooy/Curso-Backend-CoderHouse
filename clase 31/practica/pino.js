const pino = require('pino');

const loggerDesarrollo = pino({
  level: 'debug'
});

const loggerProduccion = pino({ level: 'error' }, pino.destination('./pino_debug.log'));

const logger = process.env.NODE_ENV === 'PROD' ? loggerProduccion : loggerDesarrollo;

module.exports = logger;