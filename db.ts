import mongoose from 'mongoose';

const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://127.0.0.1/todo-app';

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;



export default db;
