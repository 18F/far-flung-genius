'use strict';

const assert          = require('assert');
const Transform       = require('../../../app/models/persistence/transform');
const addTimestamps   = require('../../../app/models/persistence/transformers/add-timestamps');
const password        = require('../../../app/models/persistence/transformers/password');

describe('Transform', () => {
  it('chains together a series of transformations', () => {
    let original = {
      email: 'kane@gsay.govies',
      password: 's3kr3t'
    };
    let transformed = new Transform([addTimestamps, password.addEncryptedPassword, password.removePassword]).perform(original);
    assert.deepEqual(Object.keys(transformed).sort(), ['created_at', 'email', 'encrypted_password', 'updated_at']);
    assert.deepEqual(original, {
      email: 'kane@gsay.govies',
      password: 's3kr3t'
    });
  });
});
