'use strict';

const encryption = require('../../encryption');

module.exports = {
  addEncryptedPassword: addEncryptedPassword,
  removePassword: removePassword
};

function addEncryptedPassword(attributes) {
  let encryptedAttributes = {
    encrypted_password: encryption.encrypt(attributes.password)
  };
  return Object.assign({}, encryptedAttributes, attributes);
}

function removePassword(attributes) {
  let copy = Object.assign({}, attributes);
  delete copy.password;
  return copy;
}

