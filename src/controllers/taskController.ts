import { Request, Response } from 'express';
import Task, { ITask } from '../models/TaskModel';

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks: ITask[] = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, completed } = req.body;
    console.log(req.body, "here")
    const task: ITask = new Task({ title, completed });
    const savedTask: ITask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
      const taskId = req.params.id;
      const deletedTask: ITask | null = await Task.findByIdAndDelete(taskId);
  
      if (!deletedTask) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(200).json(deletedTask);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

export const markTaskAsCompleted = async (req: Request, res: Response): Promise<void> => {
    console.log(req.body, "here ")
    try {
      const taskId = req.params.id;
      const updatedTask: ITask | null = await Task.findByIdAndUpdate(
        taskId,
        { completed: true },
        { new: true }
      );
  
      if (!updatedTask) {
        res.status(404).json({ error: 'Task not found' });
      } else {
        res.status(200).json(updatedTask);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
