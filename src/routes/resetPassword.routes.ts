import { Router } from "express";
import { resetPassword } from "../controller/resetPassword.controller";

const router = Router();

router.post("/reset", resetPassword);

export default router;
