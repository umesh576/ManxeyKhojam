import { Router } from "express";
import { forgetPassword } from "../controller/forgetPassword.controller";
import { Authenticate } from "../middleware/authentication.middleware";
import { jobSeeker } from "../@types/role.jobseeker";

const router = Router();

router.post("/forgetPassword", Authenticate(jobSeeker), forgetPassword);

export default router;
