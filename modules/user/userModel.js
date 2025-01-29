import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  token: { type: String },
  created_at: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
});

export const userModel = mongoose.model("users", userSchema);
