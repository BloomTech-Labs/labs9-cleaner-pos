exports.up = function(knex, Promise) {
  return knex.schema.createTable('user', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.string('ext_it');
    table.string('full_name');
    table.string('email');
    table.string('phone', 15);
    table.text('address');
    table.string('role');
    table.string('photoUrl');
    table.string('stripeUID');
    table.boolean('setting_text').defaultTo(false);
    table.boolean('setting_email').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user');
};
