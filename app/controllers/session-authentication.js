'use strict';

class SessionAuthentication {
  constructor(session) {
    this.session = session;
  }

  signIn(user) {
    this.session.user_id = user.id;
  }

  signOut() {
    this.session.reset();
  }
}

module.exports = SessionAuthentication;
