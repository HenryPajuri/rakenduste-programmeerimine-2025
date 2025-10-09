const { validationResult } = require("express-validator");

exports.readAll = (req, res) => {
  const todos = require("./todos.controller").todos || [];
  res.json(todos);
};

exports.toggleDelete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const todos = require("./todos.controller").todos || [];
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({ message: "Todo not found" });
  }

  todos[todoIndex].deleted = !todos[todoIndex].deleted;
  todos[todoIndex].updatedAt = Date.now();
  res.json(todos[todoIndex]);
};
