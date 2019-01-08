
exports.up = function(knex, Promise) {
  return knex.schema.createTable('manager_ast', (table) => {
    table.increments().unique().primary();
    table.string('manager_id').unsigned();
    table.foreign('manager_id').references('manager.id');
    table.string('ast_id').unsigned();
    table.foreign('ast_id').references('assistant.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manager_ast');
};