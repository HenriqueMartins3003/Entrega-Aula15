import express from "express";
import chatService from "../services/chat.service.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("chat", {});
});

router.post("/", async (req, res) => {
  const resp = req.body;

  await chatService.createUser(resp);
});

export default router;
