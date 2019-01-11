exports.up = function(knex, Promise) {
  return knex.schema.createTable('item_complete', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.integer('item_id').unsigned();
    table
      .foreign('item_id')
      .references('items.id')
      .onDelete('CASCADE');
    table.integer('stay_id').unsigned();
    table
      .foreign('stay_id')
      .references('stay.id')
      .onDelete('CASCADE');
    table.boolean('complete').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('item_complete');
};
