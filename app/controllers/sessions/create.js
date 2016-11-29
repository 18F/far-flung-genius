'use strict';

const userQuery   = require('../../models/query/user');
const encryption  = require('../../models/encryption');

module.exports = function sessionNew(req, res, next) {
  new SessionNew(req, res, next).perform();
};

class SessionNew {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next || function () {};
    this.email = req.body.email;
    this.password = req.body.password;
  }

  perform() {
    if (!this.validParams()) { return this.userNotFound(); }
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

  userNotFound() {
    this.req.session.message = {error: 'Account not found'};
    this.res.redirect('/sign-in');
    this.next();
  }

  authenticated() {
    return encryption.match(this.password, this.user.encrypted_password);
  }

  badPassword() {
    this.req.session.message = {error: 'Bad password'};
    this.res.redirect('/sign-in?email=' + this.email);
    this.next();
  }

  signInSession() {
    this.req.session.message = {notice: 'Successfully signed in as ' + this.email};
    this.req.session.user_id = this.user.id;
    this.res.redirect('/dashboard');
    this.next();
  }
}
