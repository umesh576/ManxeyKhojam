import { Router } from "express";
import { verifyJWtToken } from "../middleware/verifyAccessToken.middleware";

const server = Router();

server.get("/check-login", verifyJWtToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default server;
