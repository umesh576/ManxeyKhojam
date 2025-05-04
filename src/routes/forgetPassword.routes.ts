import { Router } from "express";
import { forgetPassword } from "../controller/forgetPassword.controller";

const router = Router();

router.post("/forgetPassword", forgetPassword);

export default router;
