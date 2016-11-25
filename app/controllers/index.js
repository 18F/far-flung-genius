'use strict';

const requireDirectory = require('require-directory');
module.exports = requireDirectory(module, {rename: renamer});

function renamer(name) {
  return name.replace(/-([a-z])/g, (match) => {
    return match[1].toUpperCase();
  });
}
