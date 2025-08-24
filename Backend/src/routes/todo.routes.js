import { Router } from 'express';
import { body } from 'express-validator';
import { auth } from '../middleware/auth.js';
import { addTodo, myTodos, markComplete, deleteTodo } from '../controllers/todoController.js';

const router = Router();

// Get all todos of logged-in user
router.get('/', auth, myTodos);

// Add new todo
router.post(
  '/',
  auth,
  [body('task').notEmpty().withMessage('Task is required'), body('dueDate').optional().isISO8601()],
  addTodo
);

// Mark todo as complete
router.patch('/:id/complete', auth, markComplete);

// Delete todo
router.delete('/:id', auth, deleteTodo);

export default router;
