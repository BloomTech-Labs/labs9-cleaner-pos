
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_complete', (table) => {
    table.increments().unique().primary();
    table.string('item_id').unsigned();
    table.string('stay_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item_complete');
};