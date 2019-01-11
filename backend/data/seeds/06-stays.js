const data = require('./data/staysData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('stay')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('stay').insert(data);
    });
};
