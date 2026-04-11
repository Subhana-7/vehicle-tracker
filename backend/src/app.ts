import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
const uploadRoute = require('./routes/upload');

dotenv.config()

const app = express();

app.use(express.json());
app.use('/api', uploadRoute);

mongoose.connect(process.env.MONGO_URL as string)
  .then(() => console.log('DB connected'));

app.listen(5000, () => console.log('Server running'));