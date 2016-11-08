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

  subject() {
    if (!this.reserved()) {
      return this.data.subject;
    }
  }

  citation() {
    if (!this.reserved()) {
      return this.data.citation;
    }
  }

  preface() {
    let preface = {};
    if (!this.reserved()) {
      let body = this.data.body || '';
      preface.html = body;
      preface.text = body.replace(/<[^>]*>/g, '');
    }
    return preface;
  }

  excerpt() {
    let preface = {};
    if (!this.reserved()) {
      let extract = this.data.extract || '';
      preface.html = extract;
      preface.text = extract.replace(/<[^>]*>/g, '');
    }
    return preface;
  }

  parseNumber(number) {
    return number.split(/[-|.]/);
  }
}

module.exports = RegParser;
