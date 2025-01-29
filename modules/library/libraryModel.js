import mongoose from "mongoose";

const librarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  user_id: { type: String, ref: "users" },
  created_at: {
    type: Date,
    default: () => {
      return new Date();
    },
  },
});

export const libraryModel = mongoose.model("libraries", librarySchema);
