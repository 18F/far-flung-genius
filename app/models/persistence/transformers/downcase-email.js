'use strict';

module.exports = function downcaseEmail(attributes) {
  let copy = Object.assign({}, attributes);
  copy.email = copy.email && copy.email.toLowerCase();
  return copy;
};

