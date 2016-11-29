'use strict';

const assert     = require('assert');
const httpMocks  = require('node-mocks-http');
const userCreate = require('../../../app/models/persistence/user-create');
const userDelete = require('../../../app/models/persistence/user-delete');
const controller = require('../../../app/controllers/sessions/create');

describe ('sessionCreate controller', () => {
  let req, res;

  describe('when the email is missing', () => {
    beforeEach(() => {
      req = httpMocks.createRequest({
        body: {
          password: 's3kret'
        },
        session: {}
      });

      res = httpMocks.createResponse();
    });

    it('redirects to /sign-in', (done) => {
      controller(req, res, () => {
        assert.equal(res.statusCode, 302);
        assert.equal(res._getRedirectUrl(), '/sign-in');
        done();
      });
    });

    it('stores a message in the session', (done) => {
      controller(req, res, () => {
        assert(req.session.message.error);
        done();
      });
    });
  });

  describe('when the password is missing', () => {
    beforeEach(() => {
      req = httpMocks.createRequest({
        body: {
          email: 'email@gmail.com'
        },
        session: {}
      });

      res = httpMocks.createResponse();
    });

    it('redirects to /sign-in', (done) => {
      controller(req, res, () => {
        assert.equal(res.statusCode, 302);
        assert.equal(res._getRedirectUrl(), '/sign-in');
        assert(req.session.message.error);
        done();
      });
    });
  });

  describe('when the email is not found', () => {
    beforeEach(() => {
      req = httpMocks.createRequest({
        body: {
          email: 'email@gmail.com',
          password: 's3kret'
        },
        session: {}
      });

      res = httpMocks.createResponse();
    });

    it('redirects to /sign-in', (done) => {
      controller(req, res, () => {
        assert.equal(res.statusCode, 302);
        assert.equal(res._getRedirectUrl(), '/sign-in');
        assert(req.session.message.error);
        done();
      });
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

      req = httpMocks.createRequest({
        body: {
          email: email,
          password: 'not-a-match'
        },
        session: {}
      });

      res = httpMocks.createResponse();

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
      controller(req, res, () => {
        assert.equal(res.statusCode, 302);
        assert.equal(res._getRedirectUrl(), '/sign-in?email='+email);
        assert(req.session.message.error);
        done();
      });
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

      req = httpMocks.createRequest({
        body: {
          email: email,
          password: password
        },
        session: {}
      });

      res = httpMocks.createResponse();

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
      controller(req, res, () => {
        assert.equal(res.statusCode, 302);
        assert.equal(res._getRedirectUrl(), '/dashboard');
        done();
      });
    });

    it('sets a success message on the session', (done) => {
      controller(req, res, () => {
        assert.equal(res.statusCode, 302);
        assert.equal(res._getRedirectUrl(), '/dashboard');
        done();
      });
    });

    it('signs the user into the session', (done) => {
      controller(req, res, () => {
        assert.equal(req.session.user_id, user.id);
        done();
      });
    });
  });
});
