
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'chris', email: 'chris@chris.com', password: 'pass1' },
        { username: 'dave', email: 'dave@dave.com', password: 'pass1' },
        { username: 'bob', email: 'bob@bob.com', password: 'pass1' },
      ]);
    });
};
