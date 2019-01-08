
exports.up = function(knex, Promise) {
  return knex.schema.createTable('stay', (table) => {
    table.increments().unique().primary();
    table.string('guest_id').unsigned();
    table.foreign('guest_id').references('user.id');
    table.string('house_id').unsigned();
    table.foreign('house_id').references('house.id');
    table.integer('extra_guests');
    table.date('check_in');
    table.date('check_out');
    table.string('url_id')
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('stay');
};
