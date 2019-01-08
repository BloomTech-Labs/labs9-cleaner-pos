
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments().unique().primary();
    table.string('task');
    table.string('list_id').unsigned();
    table.foreign('list_id').references('list.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};