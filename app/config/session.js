'use strict';

const version   = require('../../package.json').version;
const secret    = process.env.COOKIE_SECRET;
const oneHour   = 1000 * 60;
const oneDay    = oneHour * 24;
const isSecure  = process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test';

module.exports = {
  cookieName: 'the_reckoning_' + version.replace('.', '_') + '_session',
  secret: secret,
  duration: oneHour,
  activeDuration: oneDay,
  cookie: {
    ephemeral: true,  // when true, cookie expires when the browser closes
    httpOnly: true,   // when true, cookie is not accessible from javascript
    secure: isSecure  // when true, cookie will only be sent over SSL. use key 'secureProxy' instead if you handle SSL not in your node process
  }
};


