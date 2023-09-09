import express from 'express';
import { getAllTasks, createTask, deleteTask, markTaskAsCompleted } from '../controllers/taskController';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/:id', deleteTask);
router.patch('/:id/complete', markTaskAsCompleted);

export default router;
