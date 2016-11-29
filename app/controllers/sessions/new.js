'use strict';

const MustacheRenderer = require('../../mustache-renderer');
const FlashMessage     = require('../flash-message');
const SessionAuth      = require('../session-authentication');

module.exports = function sessionNew(req, res) {
  let flash    = new FlashMessage(req).read();
  let renderer = new MustacheRenderer('sign-in');
  renderer.addView({flash: flash, csrf: req.csrfToken()});
  new SessionAuth(req).signOut();
  res.send(renderer.render());
};

