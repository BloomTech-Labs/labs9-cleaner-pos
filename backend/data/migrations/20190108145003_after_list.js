exports.up = function(knex, Promise) {
  return knex.schema.createTable('after_list', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.integer('hours_after');
    table.integer('list_id').unsigned();
    table
      .foreign('list_id')
      .references('list.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('after_list');
};
