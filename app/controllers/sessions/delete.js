'use strict';

const FlashMessage     = require('../flash-message');
const SessionAuth      = require('../session-authentication');

module.exports = function sessionNew(req, res) {
  new SessionAuth(req).signOut();
  new FlashMessage(req).notice('Signed out');
  res.redirect(SessionAuth.redirectPath);
};
