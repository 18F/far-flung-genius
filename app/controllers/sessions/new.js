'use strict';

const MustacheRenderer = require('../../mustache-renderer');

module.exports = function sessionNew(req, res) {
  let renderer = new MustacheRenderer('sign-in');
  res.send(renderer.render());
};

