'use strict';

const MustacheRenderer = require('../../mustache-renderer');
const FlashMessage     = require('../flash-message');

module.exports = function sessionNew(req, res) {
  let flash    = new FlashMessage(req).read();
  let renderer = new MustacheRenderer('sign-in');
  renderer.addView({flash: flash, csrf: req.csrfToken()});
  res.send(renderer.render());
};

