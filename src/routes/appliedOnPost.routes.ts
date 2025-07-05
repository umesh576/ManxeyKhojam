import { Router } from "express";
import { applyOnpost } from "../controller/applyOnpost.controller";
import { Authenticate } from "../middleware/authentication.middleware";
import { jobSeeker } from "../@types/role.jobseeker";

const server = Router();

server.post("/apply", Authenticate(jobSeeker), applyOnpost);
export default server;
