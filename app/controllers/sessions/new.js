'use strict';

const MustacheRenderer = require('../../mustache-renderer');

module.exports = function notFound(req, res) {
  let renderer = new MustacheRenderer('sign-in');
  res.send(renderer.render());
};

