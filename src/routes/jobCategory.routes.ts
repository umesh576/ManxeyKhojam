import { Router } from "express";
import { createJobcategory } from "../controller/jobCategory.controller";

const server = Router();

server.post("/jcategory", createJobcategory);

export default server;
