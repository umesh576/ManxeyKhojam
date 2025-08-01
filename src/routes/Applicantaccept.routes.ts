import { Router } from "express";
import { sendAcceptMessage } from "../controller/applicantaccept.controller";

const applicantRoute = Router();

applicantRoute.post("/send/:applyOnpostId", sendAcceptMessage);

export default applicantRoute;
