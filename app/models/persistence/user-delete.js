'use strict';

const db = require('../../config/db-connection');

module.exports = {
  all: all
};

function all() {
  return db('users').del();
};
