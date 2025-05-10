import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import jobCategory from "../model/jobCategory.model";

export const createJobcategory = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
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

export const findJob = async (req: Request, res: Response) => {
  const jobSearch = await jobCategory.find();

  res.status(201).json({
    status: "sucess",
    message: "Category of job find sucessfully.",
    statusCode: 201,
    data: jobSearch,
  });
};

export const findJobById = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.jobCategoryId) {
    throw new customError("Needed job Id for search", 404);
  }
  const jobSearchId = await jobCategory.findById(body.jobCategoryId);
  console.log(jobSearchId);

  // const UserCreated = await jobCategory.findById(jobSearchId.createdBy);
  // console.log(UserCreated);

  res.status(201).json({
    status: "sucess",
    message: "Category of job find sucessfully.",
    statusCode: 201,
    data: jobSearchId,
  });
};
