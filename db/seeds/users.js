exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          userid: 1,
          username: "user1",
          email: "user1@example.com",
          passwordhash: "hash1",
          fullname: "User One",
        },
        {
          userid: 2,
          username: "user2",
          email: "user2@example.com",
          passwordhash: "hash2",
          fullname: "User Two",
        },
        // Add as many users as you need
      ]);
    });
};