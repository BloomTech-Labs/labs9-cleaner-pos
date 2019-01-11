const data = require('./data/assistantsData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('assistant')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('assistant').insert(data);
    });
};
