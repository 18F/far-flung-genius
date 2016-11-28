'use strict';

const db = require('../../config/db-connection');
const downcaseEmail = require('../persistence/transformers/downcase-email');

module.exports = {
  byEmail: byEmail
};

function byEmail(email) {
  let attributes = downcaseEmail({email: email});
  return db('users')
    .where(attributes)
    .then((records) => { return records[0]; });
}
