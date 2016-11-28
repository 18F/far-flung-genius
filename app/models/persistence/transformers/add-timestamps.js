'use strict';

module.exports = function addTimestamps(attributes) {
  let timestamps = {
    created_at: new Date(),
    updated_at: new Date()
  };
  return Object.assign({}, timestamps, attributes);
};
