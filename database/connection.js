import mongoose from "mongoose";
import { APP } from "../services/constant.js";

// Function to connect the database
export const connectToDatabase = async () => {
  try {
    await mongoose.connect(APP.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error.message);
  }
};
