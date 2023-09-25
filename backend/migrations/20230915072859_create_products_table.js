exports.up = function (knex) {
    return knex.schema.createTable('products', function (table) {
      table.increments('id').primary();
      table.integer('CategoryId').notNullable();
      table.string('categoryName').notNullable();
      table.string('sku').notNullable();
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.integer('weight').notNullable();
      table.integer('width').notNullable();
      table.integer('length').notNullable();
      table.integer('height').notNullable();
      table.string('image').notNullable();
      table.integer('price').notNullable();
    });
  };
  
exports.down = function (knex) {
    return knex.schema.dropTable('products');
};
  