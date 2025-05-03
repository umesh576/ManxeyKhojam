import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import jobCategory from "../model/jobCategory.model";

export const createJobcategory = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body.jobTitle || "umesh");
  if (!body.jobTitle) {
    throw new customError("JobTitle is must needed", 404);
  }
  if (!body.decription) {
    throw new customError("Decription of job is must needed", 404);
  }

  const jobCate = await jobCategory.create(body);

  res.status(201).json({
    status: "sucess",
    message: "Job category can sucessfully created",
    statusCode: 201,
    data: jobCate,
  });
};
