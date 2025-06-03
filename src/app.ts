import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import creditSafeRoutes from "./routes/creditsafeRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "https://uptrendbusiness.netlify.app",
    credentials: true
  })
);

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/creditsafe", creditSafeRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
