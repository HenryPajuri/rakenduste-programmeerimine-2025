const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const { validateTodoId } = require("../middlewares/todos.middlewares");

router.get("/todos", adminController.readAll);
router.patch("/todos/:id/toggle-delete", validateTodoId, adminController.toggleDelete);

module.exports = router;
