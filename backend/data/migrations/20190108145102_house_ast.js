
exports.up = function(knex, Promise) {
  return knex.schema.createTable('house_ast', (table) => {
    table.increments().unique().primary();
    table.string('ast_id').unsigned();
    table.foreign('ast_id').references('assistant.id');
    table.string('house_id').unsigned();
    table.foreign('house_id').references('house.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('house_ast');
};