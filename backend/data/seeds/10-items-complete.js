const data = require('./data/itemCompleteData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('item_complete')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('item_complete').insert(data);
    });
};
