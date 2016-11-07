'use strict';

const path    = require('path');
const fs      = require('fs');
const sass    = require('node-sass');
const compass = require('compass-importer');

module.exports = function render() {
  sass.render({
    file: path.resolve(__dirname + '/../app/assets/scss/site.scss'),
    importer: compass
  }, (err, result) => {
    if (err) { return console.log(err); }
    fs.writeFileSync(path.resolve(__dirname + '/../app/public/css/site.css'), result.css);
  });
};

