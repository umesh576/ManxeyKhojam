import { Router } from "express";
import {
  createJobcategory,
  findJob,
  findJobById,
} from "../controller/jobCategory.controller";

const server = Router();

server.post("/jcategory", createJobcategory);
server.get("/getJobCategory", findJob);
server.get("/getJobCategoryById", findJobById);

export default server;
