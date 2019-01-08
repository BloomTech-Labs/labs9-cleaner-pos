
exports.up = function(knex, Promise) {
  return knex.schema.createTable('after_list', (table) => {
    table.increments().unique().primary();
    table.string('type');
    table.integer('hours_after');
    table.string('list_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('after_list');
};