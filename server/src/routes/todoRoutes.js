const express = require("express");
const router = express.Router();
const c = require("../controllers/todoController");

router.get("/", c.getTodos);
router.post("/", c.createTodo);
router.put("/:id", c.updateTodo);
router.patch("/:id/done", c.toggleTodoDone);
router.delete("/:id", c.deleteTodo);

module.exports = router;
