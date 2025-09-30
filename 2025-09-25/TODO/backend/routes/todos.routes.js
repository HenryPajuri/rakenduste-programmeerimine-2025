const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos.controller");
const {
  todosRouteMiddleware,
  todosGetRouteMiddleware,
  validateCreateTodo,
  validateUpdateTodo,
  validateTodoId,
} = require("../middlewares/todos.middlewares");

router.use(todosRouteMiddleware);

router.get("/", todosGetRouteMiddleware, todosController.read);
router.get("/:id", validateTodoId, todosController.readOne);
router.post("/", validateCreateTodo, todosController.create);
router.put("/:id", validateTodoId, validateUpdateTodo, todosController.update);
router.delete("/:id", validateTodoId, todosController.delete);

module.exports = router;
