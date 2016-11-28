'use strict';

const assert        = require('assert');
const addTimestamps = require('../../../../app/models/persistence/transformers/add-timestamps');

describe('transformers/addTimestamps', () => {
  it('does not alter the original value passed in', () => {
    let rawAttributes = {hello: 'world'};
    addTimestamps(rawAttributes);
    assert.deepStrictEqual(rawAttributes, {hello: 'world'});
  });

  it('adds created_at and updated_at timestamps', () => {
    let rawAttributes = {hello: 'world'};
    let transformedAttributes = addTimestamps(rawAttributes);
    assert(transformedAttributes.created_at);
    assert(transformedAttributes.updated_at);
  });
});
