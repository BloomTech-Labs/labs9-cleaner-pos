exports.up = function(knex, Promise) {
  return knex.schema.createTable('manager_ast', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.integer('manager_id').unsigned();
    table
      .foreign('manager_id')
      .references('manager.id')
      .onDelete('CASCADE');
    table.integer('ast_id').unsigned();
    table
      .foreign('ast_id')
      .references('assistant.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manager_ast');
};
