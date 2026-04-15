import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import tripRoutes from "./routes/trip.routes";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", tripRoutes);

connectDB().then(() => {
  app.listen(5000, () => console.log("Server running"));
});
