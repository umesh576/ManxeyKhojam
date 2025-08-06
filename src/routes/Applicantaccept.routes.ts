import { Router } from "express";
import {
  getAllAcceptInterviewPost,
  rejectUserApplication,
  sendAcceptMessage,
} from "../controller/applicantaccept.controller";
import { Authenticate } from "../middleware/authentication.middleware";
import { admin } from "../@types/role.jobseeker";

const applicantRoute = Router();

applicantRoute.post("/acceptApplication", sendAcceptMessage);
applicantRoute.get("/", getAllAcceptInterviewPost);
applicantRoute.delete(
  "/reject/:id",
  Authenticate(admin),
  rejectUserApplication
);

export default applicantRoute;
