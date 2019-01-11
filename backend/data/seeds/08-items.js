const data = require('./data/itemsData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('items').insert(data);
    });
};
