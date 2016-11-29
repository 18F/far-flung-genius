'use strict';

const acceptanceHelper = require('../support/acceptance-helper');
const userDelete       = require('../../app/models/persistence/user-delete');
const userCreate       = require('../../app/models/persistence/user-create');

describe('signing in and out flows:', () => {
  let browser;

  beforeEach((done) => {
    acceptanceHelper.startServer(() => {
      browser = acceptanceHelper.browser;
      done();
    });
  });

  afterEach((done) => {
    acceptanceHelper.stopServer(done);
  });

  it('viewing a protected page and not signed in will redirect to sign in', (done) => {
    browser
      .visit('/dashboard', () => {
        browser.assert.url({pathname: '/sign-in'});
        done();
      });
  });

  describe('signing in', () => {
    let email, password;

    beforeEach((done) => {
      email = 'email-y@GMAIL.com';
      password = 's3kr3tz';

      userDelete
        .all()
        .then(() => {
          return userCreate({
            email: email,
            password: password
          });
        })
        .then(() => { done(); })
        .catch(done);
    });

    it('will redirect back to the protected home page /dashboards', (done) => {
      browser
        .visit('/sign-in', () => {
          browser.assert.text('h1', 'Sign in');
          browser
            .fill('email', email)
            .fill('password', password)
            .pressButton('Sign in', () => {
              browser.assert.url({pathname: '/dashboard'});
              done();
            });
        });
    });
  });

  describe('signing out', () => {
    let email, password;

    beforeEach((done) => {
      email = 'email-y@GMAIL.com';
      password = 's3kr3tz';

      userDelete
        .all()
        .then(() => {
          acceptanceHelper.signIn({email: email, password: password}, done);
        })
        .catch(done);
    });

    it('will prevent you from seeing protected pages', (done) => {
      browser
        .visit('/sign-out', () => {
          browser.assert.url({pathname: '/sign-in'});
          tryVisitingProtectedPage();
        });

      function tryVisitingProtectedPage() {
        browser.visit('/dashboard', () => {
          browser.assert.url({pathname: '/sign-in'})
          done();
        });
      }
    });
  });
});
