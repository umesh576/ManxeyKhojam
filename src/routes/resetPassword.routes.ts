import { Router } from "express";
import { resetPassword } from "../controller/resetPassword.controller";
import { Authenticate } from "../middleware/authentication.middleware";
import { jobSeeker } from "../@types/role.jobseeker";

const router = Router();

router.post("/reset", Authenticate(jobSeeker), resetPassword);

export default router;
