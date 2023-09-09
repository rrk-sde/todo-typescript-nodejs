import express, { Application, Request, Response, NextFunction } from 'express';
import db from './../db'
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
dotenv.config();

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected');
});


const app: Application = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(express.json());

  // Logger middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
    next();
  });
  

app.use('/api/tasks', taskRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('ToDo App API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
