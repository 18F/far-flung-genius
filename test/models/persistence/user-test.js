'use strict';

const assert           = require('assert');
const userCreate       = require('../../../app/models/persistence/user-create');
const userDelete       = require('../../../app/models/persistence/user-delete');
const userQuery        = require('../../../app/models/query/user');

describe('user persistence', () => {
  const email = 'ms.accountant@gsa.gov';
  const password = 's3kr3t-beans';
  let user;

  beforeEach((done) => {
    userDelete
      .all()
      .then(() => { done(); })
      .catch(done);
  });

  beforeEach((done) => {
    userCreate({email: email, password: password})
      .then((createdUser) => { user = createdUser; })
      .then(() => { done(); })
      .catch(done);
  });

  after((done) => {
    userDelete
      .all()
      .then(() => { done(); })
      .catch(done);
  });

  it('created user has a hashed password', () => {
    assert(user.encrypted_password !== password);
  });

  it('created user can be found', (done) => {
    userQuery.byEmail(email)
      .then((foundUser) => { assert.equal(foundUser.id, user.id); })
      .then(() => { done(); })
      .catch(done);
  });

  // authentication
});
