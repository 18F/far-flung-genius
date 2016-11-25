'use strict';

const winston           = require('winston');
const logDir            = __dirname + '/../../log';

const defaultLogging = {
  transports: [ new winston.transports.Console({ json: true }) ]
};

const testLogging = {
  transports: [ new winston.transports.File({dirname: logDir}) ]
};

module.exports = function loggingConfig() {
  let config;
  if (process.env.NODE_ENV === 'test') {
    config = testLogging;
  } else {
    config = defaultLogging;
  }

  return config;
};
