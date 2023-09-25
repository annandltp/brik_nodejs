exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('username').notNullable().unique();
      table.string('password').notNullable();
      // Add more fields as needed
  });
};
  
exports.down = function (knex) {
  return knex.schema.dropTable('users');
};
  