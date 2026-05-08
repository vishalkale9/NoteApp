import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

connectDB();
//for health check of our application 
app.get("/", (req, res) => {
  res.send("Health Status:OK");
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});