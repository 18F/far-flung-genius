'use strict';

const userQuery             = require('../models/query/user');
const SessionAuthentication = require('./session-authentication');
const FlashMessage          = require('./flash-message');

module.exports = function(req, res, next) {
  new RequireSignIn(req, res, next).perform();
};

class RequireSignIn {
  constructor(req, res, next) {
    this.sessionAuth = new SessionAuthentication(req);
    this.flash       = new FlashMessage(req);
    this.req = req;
    this.res = res;
    this.next = next;
  }

  perform() {
    if (!this.validParams()) { return this.redirect(); }
    userQuery
      .byId(this.sessionAuth.userId())
      .then((user) => {
        if (!user) { return this.redirect(); }
        this.success(user);
      });
  }

  validParams() {
    return !!this.sessionAuth.userId();
  }

  redirect() {
    this.flash.notice('Please sign in');
    this.res.redirect(SessionAuthentication.redirectPath);
  }

  success(user) {
    this.res.locals.user = user;
    this.next();
  }
}
