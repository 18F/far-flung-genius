'use strict';

const bcrypt = require('bcrypt-nodejs');
let   salt   = process.env.ENCRYPTION_SALT;

function encrypt(password) {
  return bcrypt.hashSync(password, salt);
}

module.exports = {
  encrypt: encrypt,
  match: bcrypt.compareSync
};
