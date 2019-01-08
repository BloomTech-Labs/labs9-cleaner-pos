
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments().unique().primary();
    table.string('task');
    table.string('list_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};