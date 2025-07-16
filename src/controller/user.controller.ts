/*
what is in this file?
User register?
User login?
User Update?
Get all User?
Get User by Id?
delete User by Id?

*/
import { Request, Response } from "express";
import User from "../model/user.model";
import customError from "../middleware/errroHandler.middleware";
import { hash } from "../utils/bcrypt.hash";
import { compare } from "bcrypt";
import { generateToken } from "../utils/jwt.utils";
import { admin, Ipayload, Role } from "../@types/role.jobseeker";
import fs from "fs/promises";

//api for the user registeriation
export const registerUser = async (req: Request, res: Response) => {
  try {
    // ... registration logic ...

    const body = req.body;
    const file = req.file;

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
    const hashPassword = await hash(body.password);
    body.password = hashPassword;

    if (file) {
      body.profile = file.path;
    } else {
      throw new customError("Profile image is required", 400);
    }

    // Handle file upload
    if (file) {
      body.profile = file.path; // Consider storing just the filename
    } else {
      throw new customError("Profile image is required", 400);
    }

    const user = await User.create(body);

    res.status(201).json({
      message: "User restered sucessfully",
      status: "sucess",
      statusCode: 200,
      sucess: true,
      data: user,
    });
  } catch (error) {
    if (req.file) await fs.unlink(req.file.path); // Delete uploaded file
    next(error);
  }
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

  const isUser = await compare(password, user.password as string);

  if (!isUser) {
    throw new customError("User cannot found", 404);
  }

  const payload: Ipayload = {
    _id: user._id,
    firstName: user.firstName as string,
    lastName: user.lastName as string,
    role: user.role as Role,
  };
  const jwtToken = generateToken(payload);
  console.log(jwtToken);

  res
    .cookie("access_token", jwtToken, {
      httpOnly: true, // Prevent JavaScript access (always recommended)
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax", // CSRF protection
      maxAge: 3600000, // 1 hour expiry
      // domain: process.env.NODE_ENV === "production" ? ".yourdomain.com" : undefined,
    })
    .status(200)
    .json({
      status: "success",
      statusCode: 201,
      message: "User login successfully",
      data: user,
      token: jwtToken,
      domain: "localhost",
    });
};

//search user by id
export const findOneUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);
  if (!userId) {
    throw new customError("UserId need for search single user", 404);
  }

  const user = await User.findById(userId).select("-_id");
  res.status(201).json({
    status: "sucess",
    statuCode: 201,
    message: "User search By Id done sucessfully",
    data: user,
  });
};

// search admin by id
export const findOneAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId) {
    throw new customError("userId need for the search error.", 400);
  }

  const user = await User.findById(userId).populate("appliedOnPost");
  if (!user || !(user.role !== "admin")) {
    throw new customError("user not found.!", 404);
  }

  res.status(200).json({
    status: "success",
    message: "User fetched sucessfully",
    statusCode: 200,
    data: user,
  });
};

//delete user by id
export const delUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  if (!userId) {
    throw new customError("UserId required for delete user", 404);
  }

  const isUser = await User.findOne({ userId });
  if (!isUser) {
    throw new customError("User not found", 404);
  }

  const delUser = await User.findByIdAndDelete(userId);

  res.status(201).json({
    status: "sucess",
    statuCode: 201,
    message: "User Deleted By Id",
    data: delUser,
  });
};

//See all user in the database
export const findAllUser = async (req: Request, res: Response) => {
  const allUser = await User.find();
  res.status(201).json({
    status: "sucess",
    statuCode: 201,
    message: "User Deleted By Id",
    data: allUser,
  });
};

//update user detail
export const updateUser = async (req: Request, res: Response) => {
  const {
    email,
    password,
    userId,
    firstName,
    lastName,
    gender,
    phoneNumber,
    Skill,
  } = req.body;

  if (!userId) {
    throw new customError("Please provide the user detail for update", 404);
  }

  if (!email) {
    throw new customError("Please provide the user email for update", 404);
  }

  if (!password) {
    throw new customError("Please provide the user password for update", 404);
  }

  const userMatch = await User.findOne({ email });

  if (!userMatch) {
    throw new customError("User not found", 404);
  }

  if (!userMatch.password) {
    throw new customError("Password not available for user", 404);
  }

  if (userMatch.id !== userId) {
    throw new customError("User not Found", 404);
  }

  const isUser = await compare(password, userMatch.password as string);

  if (!isUser) {
    throw new customError("Password of the user not matched", 401);
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      firstName,
      lastName,
      gender,
      phoneNumber,
      Skill,
    },
    { new: true }
  );

  res.status(201).json({
    status: "success",
    statusCode: 201,
    message: "User updated successfully",
    data: updatedUser,
  });
};

function next(error: unknown) {
  throw new Error("Function not implemented.");
}
