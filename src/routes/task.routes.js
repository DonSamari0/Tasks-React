const express = require("express");
const router = express.Router();

//Database model
const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
  //res.json("received");
});

router.post("/", async (req, res) => {
  //console.log(req);
  const { title, description } = req.body;
  const task = new Task({ title, description });
  await task.save();
  res.json({ status: "Task Saved" });
  //res.json(req.body.title);
});

router.put("/:id", async (req, res) => {
  const { title, description } = req.body;
  const newTask = { title, description };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({ status: "Updated" });
});

router.delete("/:id", async (req, res) => {
  //const { title, description } = req.body;
  await Task.findByIdAndDelete(req.params.id);
  res.json({ status: "Deleted" });
});

router.get("/:id", async (req, res) => {
  const task = await Task.findById(req.params.id);
  res.json(task);
});

module.exports = router;
