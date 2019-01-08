
exports.up = function(knex, Promise) {
  return knex.schema.createTable('manager_ast', (table) => {
    table.increments().unique().primary();
    table.string('manager_id').unsigned();
    table.string('ast_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manager_ast');
};