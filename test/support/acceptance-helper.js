'use strict';

const port        = 3434;
const app         = require('../../app');
const Browser = require('zombie');
Browser.localhost('example.com', port);

const userCreate  = require('../../app/models/persistence/user-create');

module.exports = {
  port: port,
  startServer: startServer,
  stopServer: stopServer,
  signIn: signIn
};

function startServer(done) {
  let server = app.listen(port, () => {
    module.exports.browser = new Browser();
    module.exports.server = server;
    done();
  });
}

function stopServer(done) {
  module.exports.server.close(done);
}

function signIn(attributes, callback) {
  let browser = module.exports.browser;

  userCreate(attributes)
    .then(() => {
      browser.visit('/sign-in', () => {
        browser
          .fill('email', attributes.email)
          .fill('password', attributes.password)
          .pressButton('Sign in', callback);
      });
    });
}
