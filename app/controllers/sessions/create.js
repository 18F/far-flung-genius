'use strict';

const userQuery     = require('../../models/query/user');
const encryption    = require('../../models/encryption');
const FlashMessage  = require('../flash-message');
const SessionAuth   = require('../session-authentication');

module.exports = function sessionNew(req, res, next) {
  new SessionNew(req, res, next).perform();
};

class SessionNew {
  constructor(req, res) {
    this.flash = new FlashMessage(req.session);
    this.auth  = new SessionAuth(req.session);
    this.res = res;
    this.email = req.body.email;
    this.password = req.body.password;
  }

  perform() {
    if (!this.validParams())    { return this.userNotFound(); }
    userQuery
      .byEmail(this.email)
      .then((user) => {
        this.user = user;
        this.respond();
      });
  }

  validParams() {
    return this.email && this.password;
  }

  respond() {
    if (!this.user)             { return this.userNotFound(); }
    if (!this.authenticated())  { return this.badPassword(); }
    this.signInSession();
  }

  authenticated() {
    return encryption.match(this.password, this.user.encrypted_password);
  }

  userNotFound() {
    this.flash.error('Account not found');
    this.res.redirect('/sign-in');
  }

  badPassword() {
    this.flash.error('Bad password');
    this.res.redirect('/sign-in?email=' + this.email);
  }

  signInSession() {
    this.flash.notice('Successfully signed in as ' + this.email);
    this.auth.signIn(this.user);
    this.res.redirect('/dashboard');
  }
}
