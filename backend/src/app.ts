import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('DB connected'));

app.listen(5000, () => console.log('Server running'));