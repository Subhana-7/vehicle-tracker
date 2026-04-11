import express from 'express';
import dotenv from "dotenv"
import { connectDB } from './config/db';
const uploadRoute = require('./routes/upload');

dotenv.config()

const app = express();

app.use(express.json());
app.use('/api', uploadRoute);

connectDB()
.then(() => {
const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      })
})
.catch((error) => {
console.error("Failed to connect to database:", error);
    process.exit(1);
})