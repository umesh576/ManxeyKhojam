import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  updatePost,
} from "../controller/post.controller";
import { getPostById } from "../controller/post.controller";
import multer from "multer";
// import { Authenticate } from "../middleware/authentication.middleware";
// import { jobSeeker } from "../@types/role.jobseeker";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  //it can create the uique file name using the date math and file name
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const server = Router();

server.post("/add", upload.any(), createPost);
server.delete("/delPost", deletePost);
server.patch("/update", updatePost);
server.get("/seeAll", getAllPost);
server.get("/:postId", getPostById);
// server.get("/:postId/", getPostById);

export default server;
