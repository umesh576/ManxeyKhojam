import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  updatePost,
} from "../controller/post.controller";

const server = Router();

server.post("/add", createPost);
server.delete("/delPost", deletePost);
server.patch("/update", updatePost);
server.get("/seeAll", getAllPost);

export default server;
