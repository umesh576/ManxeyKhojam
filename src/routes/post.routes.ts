import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  updatePost,
  getPostById,
} from "../controller/post.controller";
import multer from "multer";
import { Authenticate } from "../middleware/authentication.middleware";
import { admin } from "../@types/role.jobseeker";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const postRouter = Router(); // Better name than 'server'

postRouter.post("/add", upload.any(), createPost);
postRouter.delete("/delPost", Authenticate(admin), deletePost);
postRouter.patch("/update", updatePost);
postRouter.get("/seeAll", getAllPost);
postRouter.get("/:postId", getPostById); // This is the correct usage

export default postRouter;
