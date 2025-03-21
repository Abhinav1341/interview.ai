import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import protect from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
//Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

connectDb();
app.use("/api/auth", authRoutes);
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});
app.listen(port, () => {
  console.log("Server started on http://localhost:" + port);
});
