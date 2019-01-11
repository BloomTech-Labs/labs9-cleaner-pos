const data = require('./data/afterListData');
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('after_list')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('after_list').insert(data);
    });
};
