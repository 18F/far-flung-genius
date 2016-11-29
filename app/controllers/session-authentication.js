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
    if (this.req.session) { this.req.session.user_id = null; }
  }

  userId() {
    return this.req.session && this.req.session.user_id;
  }
}

SessionAuthentication.redirectPath = '/sign-in';

module.exports = SessionAuthentication;
