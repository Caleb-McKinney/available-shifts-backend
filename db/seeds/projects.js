exports.seed = function (knex) {
  return knex("projects")
    .del()
    .then(function () {
      return knex("projects").insert([
        {
          projectid: 1,
          projectname: "Project One",
          description: "This is the first project",
          createdby: 1,
        },
        {
          projectid: 2,
          projectname: "Project Two",
          description: "This is the second project",
          createdby: 2,
        },
        // Add more projects as needed
      ]);
    });
};