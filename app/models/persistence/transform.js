'use strict';

class Transform {
  constructor(transformers) {
    this.transformers = transformers;
  }

  perform(seed) {
    this.seed = seed;
    this.transformers.forEach((transformer) => {
      this.seed = transformer(this.seed);
    });
    return this.seed;
  }
}

module.exports = Transform;
