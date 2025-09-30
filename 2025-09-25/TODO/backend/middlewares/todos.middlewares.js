const { body, param } = require("express-validator");

const todosRouteMiddleware = (req, res, next) => {
  console.log("Time: ", Date.now());
  next();
};

const todosGetRouteMiddleware = (req, res, next) => {
  console.log("GET middleware");
  next();
};

const validateCreateTodo = [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
];

const validateUpdateTodo = [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),
];

const validateTodoId = [
  param("id").isUUID().withMessage("Invalid todo ID format"),
];

module.exports = {
  todosRouteMiddleware,
  todosGetRouteMiddleware,
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
};
