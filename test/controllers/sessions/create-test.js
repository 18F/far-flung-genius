'use strict';

const assert     = require('assert');
const userCreate = require('../../../app/models/persistence/user-create');
const userDelete = require('../../../app/models/persistence/user-delete');
const controller = require('../../../app/controllers/sessions/create');

describe ('sessionCreate controller', () => {
  let req, res;

  beforeEach(() => {
    res = {};
    req = {
      session: {}
    };
  });

  describe('when the email is missing', () => {
    beforeEach(() => {
      req.body = {
        password: 's3kret'
      };
    });

    it('redirects to /sign-in', (done) => {
      res.redirect = function(path) {
        assert.equal(path, '/sign-in');
        done();
      };

      controller(req, res);
    });

    it('stores a message in the session', (done) => {
      res.redirect = function() {
        assert(req.session.message.error.length);
        done();
      };
      controller(req, res);
    });
  });

  describe('when the password is missing', () => {
    beforeEach(() => {
      req.body = {
        email: 'email@gmail.com'
      };
    });

    it('redirects to /sign-in', (done) => {
      res.redirect = function(path) {
        assert.equal(path, '/sign-in');
        assert(req.session.message.error.length);
        done();
      };
      controller(req, res);
    });
  });

  describe('when the email is not found', () => {
    beforeEach(() => {
      req.body = {
        email: 'email@gmail.com',
        password: 's3kret'
      };
    });

    it('redirects to /sign-in', (done) => {
      res.redirect = function (path) {
        assert.equal(path, '/sign-in');
        assert(req.session.message.error.length);
        done();
      };
      controller(req, res);
    });
  });

  describe('when the email is found, but the password is wrong', () => {
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

      req.body = {
        email: email,
        password: 'not-a-match'
      };

      userCreate({email: email, password: password})
        .then(() => { done(); })
        .catch(done);
    });

    afterEach((done) => {
      userDelete
        .all()
        .then(() => { done(); })
        .catch(done);
    });

    it('redirects to /sign-in', (done) => {
      res.redirect = function (path) {
        assert.equal(path, '/sign-in?email='+email);
        assert(req.session.message.error.length);
        done();
      };
      controller(req, res);
    });
  });

  describe('when the email and password are correct', () => {
    let email, password, user;

    beforeEach((done) => {
      userDelete
        .all()
        .then(() => { done(); })
        .catch(done);
    });

    beforeEach((done) => {
      email = 'kane@gov.tech';
      password = 's3kret';

      req.body = {
        email: email,
        password: password
      };

      userCreate({email: email, password: password})
        .then((createUser) => {
          user = createUser;
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

    it('redirects to /sign-in', (done) => {
      res.redirect = function (path) {
        assert.equal(path, '/dashboard');
        done();
      };
      controller(req, res);
    });

    it('sets a success message on the session', (done) => {
      res.redirect = function () {
        assert(!req.session.message.errors);
        assert(req.session.message.notice.length);
        done();
      };
      controller(req, res);
    });

    it('signs the user into the session', (done) => {
      res.redirect = function () {
        assert.equal(req.session.user_id, user.id);
        done();
      };
      controller(req, res);
    });
  });
});
