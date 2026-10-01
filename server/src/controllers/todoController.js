const Todo = require("../models/todo");

const getTodos = async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.create({ title, description });
  res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const { title, description } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    req.params.id,
    { title, description },
    { returnDocument: "after", runValidators: true },
  );
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
  }
  res.json(todo);
};

const toggleTodoDone = async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
  }
  todo.done = !todo.done;
  await todo.save();
  res.json(todo);
};

const deleteTodo = async (req, res) => {
  const todo = await Todo.findByIdAndDelete(req.params.id);
  if (!todo) {
    res.status(404).json({ message: "Todo not found" });
  }
  res.json({ message: "Todo deleted", id: req.params.id });
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo,
};
