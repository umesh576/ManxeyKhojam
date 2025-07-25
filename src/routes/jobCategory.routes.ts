import { Router } from "express";
import {
  createJobcategory,
  deleteJobCategory,
  findJob,
  findJobById,
  updateJobCategory,
} from "../controller/jobCategory.controller";
import { Authenticate } from "../middleware/authentication.middleware";
import { admin } from "../@types/role.jobseeker";

const server = Router();

server.post("/jcategory", Authenticate(admin), createJobcategory);
server.get("/getJobCategory", Authenticate(admin), findJob);
server.get(
  "/getJobCategoryById/:jobCategoryId",
  Authenticate(admin),
  findJobById
);
server.delete(
  "/delJobCategory/:jobCategoryId",
  Authenticate(admin),
  deleteJobCategory
);
server.put("/updateJobCategory", Authenticate(admin), updateJobCategory);

export default server;
