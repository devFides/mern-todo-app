const express = require("express");
const router = express.Router();
const c = require("../controllers/todoController");
const {
  validateId,
  validateCreateTodo,
  validateUpdateTodo,
} = require("../middleware/validateTodo");

router.get("/", c.getTodos);
router.post("/", validateCreateTodo, c.createTodo);
router.put("/:id", validateId, validateUpdateTodo, c.updateTodo);
router.patch("/:id/done", validateId, c.toggleTodoDone);
router.delete("/:id", validateId, c.deleteTodo);

module.exports = router;
