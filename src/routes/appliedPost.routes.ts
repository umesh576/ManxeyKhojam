import { Router } from "express";
import { applyPost } from "../controller/applyPost.controller";

const router = Router();

router.post("/apply", applyPost);

export default router;
