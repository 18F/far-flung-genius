'use strict';

class FlashMessage {
  constructor(req) {
    this.req = req;
    this.req.session.message = this.req.session.message || {};
  }

  error(message) {
    this.addMessage('error', message);
  }

  notice(message) {
    this.addMessage('notice', message);
  }

  read() {
    let messages = this.req.session.message;
    this.req.session.message = {};
    messages.notice = messages.notice && messages.notice.join('. ');
    messages.error  = messages.error  && messages.error.join('. ');
    return messages;
  }

  // ------

  normalizeArea(key) {
    this.req.session.message[key] = this.req.session.message[key] || [];
  }

  addMessage(key, message) {
    this.normalizeArea(key);
    this.req.session.message[key].push(message);
  }
}

module.exports = FlashMessage;
