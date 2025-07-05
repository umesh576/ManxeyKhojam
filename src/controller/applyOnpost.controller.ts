import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import AppliedOnPost from "../model/applyOnPost.model";

export const applyOnpost = async (req: Request, res: Response) => {
  const body = req.body;

  if (!body.userId) {
    throw new customError("Userid need for the validate user", 400);
  }
  if (
    !body.experience ||
    body.userId ||
    body.resume ||
    body.firstName ||
    body.lastname
  ) {
    throw new customError("Please provide the all details", 400);
  }

  const userAppliedDetails = AppliedOnPost.create(body);

  res.status(200).json({
    status: "success",
    message: "Post can sucessfully Applied.",
    satatusCode: 200,
    data: userAppliedDetails,
  });
};
