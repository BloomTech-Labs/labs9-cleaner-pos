const data = require('./data/houseAst');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('house_ast')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('house_ast').insert(data);
    });
};
