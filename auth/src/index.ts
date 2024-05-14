import mongoose from 'mongoose';
import { app } from './app';

const PORT = 3000;

const start = () => {
  mongoose
    .connect(
      'mongodb://127.0.0.1:27017/tiketi2auth?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1'
    )
    .then(() => console.log('connnected to mongodb'))
    .catch((error) => console.log(error));

  app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
};

start();
