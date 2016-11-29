'use strict';

const cookieSession = require('cookie-session');
const version       = require('../../package.json').version;
const secret        = process.env.COOKIE_SECRET;
const oneHour       = 1000 * 60;
const oneDay        = oneHour * 24;
const isSecure      = process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test';

let config = {
  name: 'the-recoking-session-' + version,
  secret: secret,
  maxAge: oneDay,
  secure: isSecure,
};

module.exports = function setup() {
  return cookieSession(config);
};

