'use strict';

const assert        = require('assert');
const password      = require('../../../../app/models/persistence/transformers/password');

describe('transformers/password', () => {
  describe('#addEncryptedPassword', () => {
    it('does not mutate the argument', () => {
      let rawAttributes = {password: 'hello-secret'};
      password.addEncryptedPassword(rawAttributes);
      assert.deepStrictEqual(rawAttributes, {password: 'hello-secret'});
    });

    it('adds the encrypted password', () => {
      let rawAttributes = {password: 'hello-secret'};
      let transformed = password.addEncryptedPassword(rawAttributes);
      assert(transformed.encrypted_password);
    });
  });

  describe('#removePassword', () => {
    it('does not mutate the argument', () => {
      let rawAttributes = {password: 'hello-secret', hello: 'world'};
      password.removePassword(rawAttributes);
      assert.deepStrictEqual(rawAttributes, {password: 'hello-secret', hello: 'world'});
    });

    it('adds the encrypted password', () => {
      let rawAttributes = {password: 'hello-secret', hello: 'world'};
      let transformed = password.removePassword(rawAttributes);
      assert.deepEqual(Object.keys(transformed), ['hello']);
    });
  });
});
