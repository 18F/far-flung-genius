'use strict';

const assert        = require('assert');
const downcaseEmail = require('../../../../app/models/persistence/transformers/downcase-email');

describe('transformers/downcaseEmail', () => {
  it('does not alter the original value passed in', () => {
    let rawAttributes = {email: 'hello@world.com'};
    downcaseEmail(rawAttributes);
    assert.deepStrictEqual(rawAttributes, {email: 'hello@world.com'});
  });

  it('adds downcases the email, for normalization and searching', () => {
    let rawAttributes = {email: 'Hello@World.com'};
    let transformedAttributes = downcaseEmail(rawAttributes);
    assert.equal(transformedAttributes.email, 'hello@world.com');
  });
});

