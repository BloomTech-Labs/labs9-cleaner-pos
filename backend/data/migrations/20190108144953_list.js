exports.up = function(knex, Promise) {
  return knex.schema.createTable('list', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.string('type');
    table.integer('house_id').unsigned();
    table
      .foreign('house_id')
      .references('house.id')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('list');
};
