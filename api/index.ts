import { NextFunction } from "connect";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://task-manager-demo-frontend.vercel.app",
      "*"
    ],
  })
);
const port = 4000;
require("dotenv").config();

app.use(express.json());

const environment = "development";
const config = require("../knexfile")[environment];
const knex = require("knex")(config);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Welcome to the task manager server!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// ************* projects routes ******************
app.get("/projects", async (req, res) => {
  try {
    const projects = await knex.select("*").from("projects");
    res.json(projects);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

app.post("/projects", async (req: Request, res: Response) => {
  try {
    const [project] = await knex("projects").insert(req.body).returning("*");
    res.status(201).json(project);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

app.put("/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [project] = await knex("projects")
      .where("projectid", id)
      .update(req.body)
      .returning("*");
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

app.delete("/projects/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await knex("projects").where("projectid", id).delete();
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

// ************* tasks routes ******************

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await knex.select("*").from("tasks");
    res.json(tasks);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const [task] = await knex("tasks").insert(req.body).returning("*");
    res.status(201).json(task);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [task] = await knex("tasks")
      .where("taskid", id)
      .update(req.body)
      .returning("*");
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

app.delete("/tasks/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await knex("tasks").where("taskid", id).delete();
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

// ************* users routes ******************
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await knex.select("*").from("users");
    res.json(users);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ error: err.message });
  }
});

// ERROR HANDLING

// 404 error handler
app.use((req: Request, res: Response, next) => {
  const error = new Error(
    "404 NOT FOUND: Are you sure you are supposed to be here???"
  );
  res.status(404);
  next(error);
});

// general error handler
app.use(
  (
    error: { status: number; message: any },
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  }
);