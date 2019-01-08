
exports.up = function(knex, Promise) {
  return knex.schema.createTable('house_ast', (table) => {
    table.increments().unique().primary();
    table.string('ast_id').unsigned();
    table.string('house_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('house_ast');
};