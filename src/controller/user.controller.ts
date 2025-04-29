import { Request, Response } from "express";
// import User from "../model/employer.model";
import User from "../model/jobseeker.model";
import customError from "../middleware/errroHandler.middleware";

//api for the user registeriation
export const registerUser = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  if (!body.firstName) {
    throw new customError("Firstname is Required", 404);
  }
  if (!body.lastName) {
    throw new customError("Username is Required", 404);
  }
  if (!body.password) {
    throw new customError("Password is Required", 404);
  }
  if (!body.email) {
    throw new customError("Email is Required", 404);
  }

  const alreadyExist = await User.findOne({ email: body.email });
  if (alreadyExist) {
    throw new customError("Email is already exist", 404);
  }
  const user = await User.create(body);

  res.status(201).json({
    message: "User restered sucessfully",
    status: "sucess",
    statusCode: 200,
    sucess: true,
    data: user,
  });
};

//api for the login user
export const login = async (req: Request, res: Response) => {};
