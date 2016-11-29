'use strict';

const MustacheRenderer = require('../../mustache-renderer');
const FlashMessage     = require('../flash-message');

module.exports = function sessionNew(req, res) {
  let flash    = new FlashMessage(req).read();
  let renderer = new MustacheRenderer('sign-up');
  renderer.addView({flash: flash});
  res.send(renderer.render());
};


