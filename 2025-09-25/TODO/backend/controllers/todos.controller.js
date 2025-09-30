const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

const todos = [
  {
    id: "a1b2c3d4-e5f6-4a5b-8c9d-0e1f2a3b4c5d",
    title: "Learn React",
    createdAt: 1727098800585,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "f6e7d8c9-b0a1-2b3c-4d5e-6f7a8b9c0d1e",
    title: "Build TODO app",
    createdAt: 1727098952739,
    updatedAt: null,
    deleted: false,
  },
];

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.body;
  const newTodo = {
    id: uuidv4(),
    title,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};

exports.read = (req, res) => {
  const activeTodos = todos.filter((todo) => !todo.deleted);
  res.json(activeTodos);
};

exports.readOne = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const todo = todos.find((t) => t.id === id && !t.deleted);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  res.json(todo);
};

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { title } = req.body;
  const todoIndex = todos.findIndex((t) => t.id === id && !t.deleted);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  if (title !== undefined) todos[todoIndex].title = title;
  todos[todoIndex].updatedAt = Date.now();
  res.json(todos[todoIndex]);
};

exports.delete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const todoIndex = todos.findIndex((t) => t.id === id && !t.deleted);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[todoIndex].deleted = true;
  todos[todoIndex].updatedAt = Date.now();
  res.json({ message: "Todo deleted successfully" });
};
