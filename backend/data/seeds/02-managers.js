const data = require('./data/managersData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('manager')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('manager').insert(data);
    });
};
