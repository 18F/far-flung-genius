'use strict';

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments();
      table.string('email');
      table.string('encrypted_password');
      table.string('role');
      table.timestamps();
      table.unique(['email']);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ]);
};
