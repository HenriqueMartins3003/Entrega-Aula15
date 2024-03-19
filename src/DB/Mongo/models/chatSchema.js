import mongoose from "mongoose";

const chatColletion = "messages";

const chatSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
  },
  messages: String,
});

export const chatModel = mongoose.model(chatColletion, chatSchema);
