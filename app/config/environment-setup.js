'use strict';

const dotenv        = require('dotenv');

module.exports.load = function load(env) {
  env = process.env.NODE_ENV || 'development';

  if (env === 'development' || env === 'test') {
    dotenv.config();
  }
};
