import mongoose from "mongoose";

const chatColletion = "messages";

const chatSchema = new mongoose.Schema({
  user: String,
  message: [String],
  createdAt: { type: Date, default: Date.now },
});

export const chatModel = mongoose.model(chatColletion, chatSchema);
