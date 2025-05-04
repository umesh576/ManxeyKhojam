import customError from "../middleware/errroHandler.middleware";
import { Request, Response } from "express";
import User from "../model/user.model";

export const forgetPassword = async (req: Request, res: Response) => {
  const body = req.body;

  console.log(body.email);
  if (!body.email) {
    throw new customError("Email is must required for Reset password", 400);
  }

  const isUser = await User.findOne({ email: body.email });
  console.log(isUser);
  if (!isUser) {
    throw new customError("User is not exist with this email", 400);
  }

  const forgetPin = Math.random();
  console.log(forgetPin);
  res.status(200).json({
    status: 200,
    statusCode: 200,
    message: "OTP can sucessfully send.",
  });
};
