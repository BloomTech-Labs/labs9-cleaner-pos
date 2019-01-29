exports.up = function(knex, Promise) {
  return knex.schema.createTable('house', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.string('name');
    table.text('address');
    table.decimal('price', 8, 2);
    table.decimal('cleaning_fee', 8, 2);
    table.decimal('extra_guest_fee', 8, 2);
    table.integer('default_ast').unsigned();
    table
      .foreign('default_ast')
      .references('assistant.id')
      .onDelete('CASCADE');
    table.integer('manager').unsigned();
    table
      .foreign('manager')
      .references('manager.id')
      .onDelete('CASCADE');
    table.string('photo_url');
    table.string('guest_guide');
    table.string('ast_guide');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('house');
};
