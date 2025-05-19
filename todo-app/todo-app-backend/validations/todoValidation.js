const { body, param } = require('express-validator');

exports.createTodoValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').optional().isString(),
  body('status').optional().isIn(['pending', 'completed']).withMessage('Status must be pending or completed'),
  body('dueDate').optional().isISO8601().toDate().withMessage('Due date must be a valid date'),
];

exports.updateTodoValidation = [
  param('id').isMongoId().withMessage('Invalid todo ID'),
  body('title').optional().trim().notEmpty(),
  body('description').optional().isString(),
  body('status').optional().isIn(['pending', 'completed']),
  body('dueDate').optional().isISO8601().toDate(),
];

exports.todoIdValidation = [
  param('id').isMongoId().withMessage('Invalid todo ID'),
];
