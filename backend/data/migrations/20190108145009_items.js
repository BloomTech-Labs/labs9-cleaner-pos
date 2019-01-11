exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.string('task');
    table.integer('list_id').unsigned();
    table
      .foreign('list_id')
      .references('list.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
