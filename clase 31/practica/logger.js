const log4js = require('log4js');

log4js.configure({
  appenders: {
    consola: { type: 'console' },
    archivoDebug: { type: 'file', filename: 'debug.log' },
    archivoError: { type: 'file', filename: 'error.log' },
    soloDebug: { type: 'logLevelFilter', appender: 'archivoDebug', level: 'debug'},
    soloError: { type: 'logLevelFilter', appender: 'archivoError', level: 'error'}
  },
  categories: {
    default: { appenders: ['consola'], level: 'info'},
    desarrollo: { appenders: ['consola'], level: 'info' },
    produccion: { appenders: ['soloDebug', 'soloError'], level: 'debug' }
  }
});

const logAUtilizar = process.env.NODE_ENV === 'PROD' ? 'produccion' : 'desarrollo';

module.exports = log4js.getLogger(logAUtilizar);