import { Router } from "express";
import {
  getAllAcceptInterviewPost,
  sendAcceptMessage,
} from "../controller/applicantaccept.controller";

const applicantRoute = Router();

applicantRoute.post("/acceptApplication", sendAcceptMessage);
applicantRoute.get("/", getAllAcceptInterviewPost);

export default applicantRoute;
