import { Router } from "express";
import { login } from "../controller/user.controller";
import { registerUser } from "../controller/user.controller";

const router = Router();

router.post("/login", login);
router.post("/register", registerUser);

export default router;
