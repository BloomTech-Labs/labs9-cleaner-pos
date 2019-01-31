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
    table.string('strip_cust');
    table.string('strip_sub_id');
    table.string('strip_sub_plan');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manager');
};
