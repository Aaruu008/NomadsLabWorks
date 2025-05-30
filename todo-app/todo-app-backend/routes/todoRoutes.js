const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
router.get('/', todoController.getAllTodos);

// POST a new todo
router.post('/', todoController.createTodo);

// PUT update a todo
router.put('/:id', todoController.updateTodo);

// PATCH toggle todo completion status
router.patch('/:id/toggle', todoController.toggleTodo);

// DELETE a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;