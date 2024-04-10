exports.seed = function (knex) {
  return knex("tasks")
    .del()
    .then(function () {
      return knex("tasks").insert([
        {
          taskid: 1,
          projectid: 1,
          assignedto: 1,
          title: "Task 1 for Project 1",
          description: "Do something important",
          status: "New",
          priority: "High",
          duedate: "2024-01-01",
        },
        {
          taskid: 2,
          projectid: 2,
          assignedto: 2,
          title: "Task 1 for Project 2",
          description: "Do something else important",
          status: "In Progress",
          priority: "Medium",
          duedate: "2024-02-01",
        },
        // Add more tasks as needed
      ]);
    });
};