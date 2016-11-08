'use strict';

const assert      = require('assert');
const RegParser   = require('../../app/models/reg-parser');
const data        = require('../fixtures/regs');

describe('RegParser', () => {
  let parser, reservedParser;

  beforeEach(() => {
    parser = new RegParser(data.nested);
    reservedParser = new RegParser(data.reserved);
  });

  it('separates the chapter information', () => {
    assert.deepEqual(parser.chapter(), {
      year: '2014',
      title: 48,
      volume: 2,
      chapter: 1,
      name: 'FAR'
    });
  });

  describe('identifier', () => {
    it('has an identifier name', () => {
      assert.equal(parser.identifier().name, '52.202-1');
    });

    it('has parts', () => {
      assert.deepEqual(parser.identifier().parts, ['52', '202', '1']);
    });
  });

  describe('subject', () => {
    it('return the data subject when real', () => {
      assert.equal(parser.subject(), 'Definitions.');
    });

    it('return nothing when the item is reserved', () => {
      assert.equal(reservedParser.subject(), undefined);
    });
  });

  describe('reserved', () => {
    it('is true for reserved for those with that flag', () => {
      assert.equal(reservedParser.reserved(), true);
    });

    it('is false for normal items', () => {
      assert.equal(parser.reserved(), false);
    });
  });

  describe('citation', () => {
    it('includes the data citation', () => {
      assert.equal(parser.citation(), '[78 FR 70482, Nov. 25, 2013]');
    });

    it('is empty when reserved', () => {
      assert.equal(reservedParser.citation(), undefined);
    });
  });

  it('includes the link', () => {
    assert.equal(parser.link(), 'http://www.law.cornell.edu/cfr/text/48/52.202-1');
  });

  describe('preface', () => {
    it('is empty when reserved', () => {
      assert.deepEqual(reservedParser.preface(), {});
    });

    it('includes a description of the excerpt when not reserved', () => {
      assert.equal(parser.preface().html, data.nested.body);
      assert.equal(parser.preface().text, 'As prescribed in 2.201, insert the following clause:\n');
    });
  });

  describe('excerpt', () => {
    it('is empty when reserved', () => {
      assert.deepEqual(reservedParser.excerpt(), {});
    });

    it('includes a description of the excerpt when not reserved', () => {
      assert.equal(parser.excerpt().html, data.nested.extract);
      assert(parser.excerpt().text);
    });
  });

  //"extract": "<h3 SOURCE=\"HD1\">Definitions (NOV 2013)</h3>\n<P>When a solicitation provision or contract clause uses a word or term that is defined in the Federal Acquisition Regulation (FAR), the word or term has the same meaning as the definition in FAR 2.101 in effect at the time the solicitation was issued, unless&#x2014;</P>\n<P>(a) The solicitation, or amended solicitation, provides a different definition;<PRTPAGE P=\"18\"></PRTPAGE>\n            </P>\n<P>(b) The contracting parties agree to a different definition;</P>\n<P>(c) The part, subpart, or section of the FAR where the provision or clause is prescribed provides a different meaning; or</P>\n<P>(d) The word or term is defined in FAR Part 31, for use in the cost principles and procedures.</P>",

});
