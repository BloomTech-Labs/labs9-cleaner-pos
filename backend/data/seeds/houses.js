const data = require('./data/housesData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('house')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('house').insert(data);
    });
};
