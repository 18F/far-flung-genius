'use strict';

class SessionAuthentication {
  constructor(req) {
    this.req = req;
    this.session = req.session;
  }

  signIn(user) {
    this.session.user_id = user.id;
  }

  signOut() {
    this.req.session = null;
  }

  userId() {
    return this.req.session && this.req.session.user_id;
  }
}

SessionAuthentication.redirectPath = '/sign-in';

module.exports = SessionAuthentication;
