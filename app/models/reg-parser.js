'use strict';

class RegParser {
  constructor(data) {
    this.data = data || {};
  }

  chapter() {
    return {
      year:     this.data.year,
      title:    this.data.title,
      volume:   this.data.volume,
      chapter:  this.data.chapter,
      name:     this.data.subchapter
    };
  }

  identifier() {
    let number = this.data.number;
    return {
      name: number,
      parts: this.parseNumber(number)
    };
  }

  reserved() {
    return this.data.reserverd;
  }

  link() {
    return this.data.link;
  }

  delegate() {
    if (this._delegate) { return this._delegate; }
    let Klass = this.reserved() ? ReservedNullParser : UnreservedParser;
    this._delegate = new Klass(this.data);
    return this._delegate;
  }

  parseNumber(number) {
    return number.split(/[-|.]/);
  }
}

['subject', 'citation', 'preface', 'excerpt'].forEach((method) => {
  RegParser.prototype[method] = function() {
    return this.delegate()[method]();
  };
});

class ReservedNullParser {
  subject() {}
  citation() {}
  preface() { return {}; }
  excerpt() { return {}; }
}

class UnreservedParser {
  constructor(data) {
    this.data = data;
  }

  subject() {
    return this.data.subject;
  }

  citation() {
    return this.data.citation;
  }

  preface() {
    let text = this.data.body || '';
    return {
      html: text,
      text: text.replace(/<[^>]*>/g, '')
    };
  }

  excerpt() {
    let text = this.data.extract || '';
    return {
      html: text,
      text: text.replace(/<[^>]*>/g, '')
    };
  }
}

module.exports = RegParser;
