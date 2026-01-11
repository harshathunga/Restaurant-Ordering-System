import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import login from "./routes/login.js";
import menu from "./routes/menu.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ CORS ONLY HERE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// ✅ Routes
app.use("/restro", login);
app.use("/menu", menu);

app.listen(process.env.port, () => {
  console.log("Server running on", process.env.port);
});
