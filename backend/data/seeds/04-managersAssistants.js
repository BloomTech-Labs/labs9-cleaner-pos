const data = require('./data/managerAssistantsData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('manager_ast')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('manager_ast').insert(data);
    });
};
