exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('user')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user').insert([
        { full_name: 'Harald Junke' },
        { full_name: 'Gerhard Schroeder' },
        { full_name: 'Guenter Jauch' },
      ]);
    });
};
