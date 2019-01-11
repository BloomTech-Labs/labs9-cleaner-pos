exports.up = function(knex, Promise) {
  return knex.schema.createTable('assistant', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('user.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('assistant');
};
