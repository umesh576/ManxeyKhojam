import { Router } from "express";
import {
  createJobcategory,
  deleteJobCategory,
  findJob,
  findJobById,
  updateJobCategory,
} from "../controller/jobCategory.controller";

const server = Router();

server.post("/jcategory", createJobcategory);
server.get("/getJobCategory", findJob);
server.get("/getJobCategoryById", findJobById);
server.delete("/delJobCategory", deleteJobCategory);
server.put("/updateJobCategory", updateJobCategory);

export default server;
