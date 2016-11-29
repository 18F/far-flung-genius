'use strict';

const assert     = require('assert');
const userCreate = require('../../app/models/persistence/user-create');
const userDelete = require('../../app/models/persistence/user-delete');
const middleware = require('../../app/controllers/require-sign-in');

describe ('requireSignIn middleware', () => {
  let req, res, next;

  beforeEach(() => {
    next = function () {};
    res = {
      locals: {}
    };
    req = {
      session: {}
    };
  });

  describe('when there is no user id in session', () => {
    it('redirects to /sign-in', (done) => {
      res.redirect = function(path) {
        assert.equal(path, '/sign-in');
        done();
      };

      middleware(req, res, next);
    });

    it('adds a message asking the user to sign in', (done) => {
      res.redirect = function () {
        assert(req.session.message.notice.length);
        done();
      };
      middleware(req, res, next);
    });
  });

  describe('when the user is not found', () => {
    beforeEach((done) => {
      userDelete
        .all()
        .then(() => { done(); })
        .catch(done);
    });

    beforeEach(() => {
      req.session.user_id = 42;
    });

    it('redirects to /sign-in with an message asking the user to sign in', (done) => {
      res.redirect = function (path) {
        assert.equal(path, '/sign-in');
        assert(req.session.message.notice.length);
        done();
      };
      middleware(req, res, next);
    });
  });

  describe('when user is found', () => {
    let email, password;

    beforeEach((done) => {
      userDelete
        .all()
        .then(() => { done(); })
        .catch(done);
    });

    beforeEach((done) => {
      email = 'kane@gov.tech';
      password = 's3kret';

      userCreate({email: email, password: password})
        .then((user) => {
          req.session.user_id = user.id;
          done();
        })
        .catch(done);
    });

    afterEach((done) => {
      userDelete
        .all()
        .then(() => { done(); })
        .catch(done);
    });

    it('sets the response local user to the found user', (done) => {
      next = function () {
        assert(res.locals.user);
        assert.equal(res.locals.user.id, req.session.user_id);
        assert.equal(res.locals.user.email, email);
        done();
      };

      middleware(req, res, next);
    });
  });
});
