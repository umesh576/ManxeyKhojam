import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  updatePost,
} from "../controller/post.controller";

const server = Router();

server.post("/add", createPost);
server.delete("/delPost", deletePost);
server.patch("/update", updatePost);
server.get("/seeAll", getAllPost);
server.get("/seeOne", getPostById);

export default server;
