const data = require('./data/listsData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('list')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('list').insert(data);
    });
};
