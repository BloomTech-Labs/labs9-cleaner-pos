
exports.up = function(knex, Promise) {
  return knex.schema.createTable('manager', (table) => {
    table.increments().unique().primary();
    table.string('user_id').unsigned();
    table.foreign('user_id').references('user.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('manager');
};
