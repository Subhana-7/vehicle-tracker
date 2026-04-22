import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import tripRoutes from "./routes/trip.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api", tripRoutes);
app.use("/auth", authRoutes);

connectDB().then(() => {
  app.listen(5000, () => console.log("Server running"));
});
