'use strict';

const assert      = require('assert');
const encryption  = require('../../app/models/encryption');

describe('encryption', () => {
  it('transforms the password into a hash', () => {
    let password = 's3kr3t!!';
    let encrypted = encryption.encrypt(password);
    assert.notEqual(password, encrypted);
  });

  it('#match will return true if the passed in value is identical to the one use to create the hash', () => {
    let password = 's3kr3t!!';
    let encrypted = encryption.encrypt(password);
    assert.ok(encryption.match(password, encrypted));
  });

  it('#match will return false if the passed in value is identical to the one use to create the hash', () => {
    let password = 's3kr3t!!';
    let encrypted = encryption.encrypt(password);
    assert(!encryption.match(password + ' ', encrypted));
  });
});

