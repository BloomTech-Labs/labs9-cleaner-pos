exports.up = function(knex, Promise) {
  return knex.schema.createTable('manager', (table) => {
    table
      .increments('id')
      .unique()
      .primary();
    table.integer('user_id').unsigned();
    table
      .foreign('user_id')
      .references('user.id')
      .onDelete('CASCADE');
    table.string('stripe_cust');
    table.string('stripe_sub_id');
    table.string('stripe_sub_plan');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manager');
};
