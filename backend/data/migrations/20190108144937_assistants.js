
exports.up = function(knex, Promise) {
  return knex.schema.createTable('assistants', (table) => {
    table.increments().unique().primary();
    table.string('user_id').unsigned();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('assistants');
};
