
exports.up = function(knex, Promise) {
  return knex.schema.createTable('list', (table) => {
    table.increments().unique().primary();
    table.string('type');
    table.string('house_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('list');
};
