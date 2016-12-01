'use strict';

const MustacheRenderer = require('../../mustache-renderer');

module.exports = function sessionNew(req, res) {
  let renderer = new MustacheRenderer('reset-password');
  renderer.addView({csrf: req.csrfToken()});
  res.send(renderer.render());
};

