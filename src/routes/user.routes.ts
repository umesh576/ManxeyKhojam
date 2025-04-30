import { Router } from "express";
import { login } from "../controller/user.controller";
import { registerJobseeker } from "../controller/user.controller";

const router = Router();

router.post("/login", login);
router.post("/register", registerJobseeker);

export default router;
