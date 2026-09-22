const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../models/Todo");

const router = express.Router();

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// READ  - GET /api/todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// CREATE - POST /api/todos
router.post("/", async (req, res) => {
  try {
    const { task, completed } = req.body;
    if (!task || !task.trim()) {
      return res.status(400).json({ error: "Task cannot be empty" });
    }
    const todo = await Todo.create({ task, completed: Boolean(completed) });
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE - PUT /api/todos/:id  (toggle completed / edit text)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const updated = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - DELETE /api/todos/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ error: "Invalid id" });
  try {
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted", id });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
