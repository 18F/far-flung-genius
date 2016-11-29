'use strict';

class FlashMessage {
  constructor(session) {
    this.session = session;
    this.session.message  = this.session.message || {};
  }

  error(message) {
    this.addMessage('error', message);
  }

  notice(message) {
    this.addMessage('notice', message);
  }

  // ------

  normalizeArea(key) {
    this.session.message[key] = this.session.message[key] || [];
  }

  addMessage(key, message) {
    this.normalizeArea(key);
    this.session.message[key].push(message);
  }
}

module.exports = FlashMessage;
