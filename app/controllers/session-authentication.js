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
}

module.exports = SessionAuthentication;
