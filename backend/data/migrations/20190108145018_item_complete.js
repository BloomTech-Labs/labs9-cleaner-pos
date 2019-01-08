
exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_complete', (table) => {
    table.increments().unique().primary();
    table.string('item_id').unsigned();
    table.foreign('item_id').references('items.id');
    table.string('stay_id').unsigned();
    table.foreign('stay_id').references('stay.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item_complete');
};