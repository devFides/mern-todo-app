const Todo = require("../models/todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({
    title: title.trim(),
    description: description?.trim(),
  });
  return res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  const updates = {};
  if (title !== undefined) updates.title = title.trim();
  if (description !== undefined) updates.description = description.trim();

  const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  return res.json(todo);
};

const toggleTodoDone = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  todo.done = !todo.done;
  await todo.save();
  return res.json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  return res.json({ message: "Todo deleted", id: req.params.id });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo,
};
