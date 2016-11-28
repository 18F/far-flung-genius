'use strict';

const db     = require('../../config/db-connection');
const addTimestamps = require('./transformers/add-timestamps');
const password      = require('./transformers/password');
const downcaseEmail = require('./transformers/downcase-email');
const Transform     = require('./transform');

const transformers = [
  addTimestamps,
  password.addEncryptedPassword,
  password.removePassword,
  downcaseEmail
];

module.exports = function userCreate(rawAttributes) {
  let attributes = new Transform(transformers).perform(rawAttributes);
  return db('users')
    .insert(attributes)
    .returning(['id', 'email', 'role', 'created_at', 'updated_at'])
    .then((records) => { return records[0]; });
};
