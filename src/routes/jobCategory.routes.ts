import { Router } from "express";
import {
  createJobcategory,
  delteJobCategory,
  findJob,
  findJobById,
} from "../controller/jobCategory.controller";

const server = Router();

server.post("/jcategory", createJobcategory);
server.get("/getJobCategory", findJob);
server.get("/getJobCategoryById", findJobById);
server.delete("/delJobCategory", delteJobCategory);

export default server;
