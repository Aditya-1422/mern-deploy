import express from "express";
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from '../router/userRouter.js'

// cors origins
const allowedOrigins = [
  "http://localhost:3000"
];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// parsers
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// application routes

// users
app.use("/api/v1/", userRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;