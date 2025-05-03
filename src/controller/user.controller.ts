import { Request, Response } from "express";
// import User from "../model/employer.model";
import User from "../model/jobseeker.model";
import customError from "../middleware/errroHandler.middleware";
import { hash } from "../utils/bcrypt.hash";
import { compare } from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import { Ipayload } from "../@types/role.jobseeker";

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
  const hashPassword = await hash(body.password);
  body.password = hashPassword;
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
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    throw new customError("Email is mecessary for login", 404);
  }
  if (!password) {
    throw new customError("Password is mecessary for login", 404);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new customError("User can't find", 404);
  }

  const isUser = await compare(password, user.password);

  if (!isUser) {
    throw new customError("User cannot found", 404);
  }

  const payload: Ipayload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
  const jwtToken = generateToken(payload);
  console.log(jwtToken);

  res
    .cookie("acess_token", jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 3600000,
    })
    .status(200)
    .json({
      status: "sucess",
      statusCode: 201,
      message: "User login sucessfully",
      data: user,
      token: jwtToken,
    });
};

export const findOneUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  console.log(userId);
  if (!userId) {
    throw new customError("UserId need for search single user", 404);
  }
  const user = await User.findById(userId);
  res.status(201).json({
    status: "sucess",
    statuCode: 201,
    message: "User search By Id done sucessfully",
    data: user,
  });
};

export const delUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    throw new customError("UserId required for delete user", 404);
  }
  const delUser = await User.findByIdAndDelete(userId);
  res.status(201).json({
    status: "sucess",
    statuCode: 201,
    message: "User Deleted By Id",
    data: delUser,
  });
};

export const findAllUser = async (req: Request, res: Response) => {
  const allUser = await User.find();
  res.status(201).json({
    status: "sucess",
    statuCode: 201,
    message: "User Deleted By Id",
    data: allUser,
  });
};
