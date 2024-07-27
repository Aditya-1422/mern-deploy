import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";  // Assuming your initial code is in app.js

// Load environment variables from .env file
dotenv.config({path:'./config.env'});

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error: ", error);
    process.exit(1);
  }
};

// Start the server
const startServer = async () => {

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  await connectDB();
};

startServer();
