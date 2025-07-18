import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import jobCategory from "../model/jobCategory.model";

export const createJobcategory = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body.jobTitle);
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

export const deleteJobCategory = async (req: Request, res: Response) => {
  const { jobCategoryId } = req.body;
  if (!jobCategoryId) {
    throw new customError("please provide jobCategoryId", 400);
  }

  const delJobCategory = await jobCategory.findByIdAndDelete(jobCategoryId);

  res.status(200).json({
    status: "success",
    statuscode: 200,
    message: "Jobcategory can sucessfully deleted",
    data: delJobCategory,
  });
};

export const updateJobCategory = async (req: Request, res: Response) => {
  const jobCategoryId = req.body.id;
  console.log(jobCategoryId);
  const jobDetails = req.body;
  if (!jobCategoryId) {
    throw new customError("please provide jobCategoryId", 400);
  }
  const upJobCategory = await jobCategory.findByIdAndUpdate(
    jobCategoryId,
    jobDetails,
    { new: true }
  );
  res.status(200).json({
    status: "success",
    statuscode: 200,
    message: "jobCategory Updated sucessfully",
    data: upJobCategory,
  });
};
