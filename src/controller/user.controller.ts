import { Request, Response } from "express";
import User from "../model/employer.model";

//api for the user register
export const registerUser = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.username) {
    console.log(Error);
  }
  if (!body.password) {
    console.log(Error);
  }

  const alreadyExist = await User.findOne(body.email);
  if (alreadyExist) {
    console.log(Error);
  }
};

//api for the login user
export const login = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.username) {
    console.log(Error);
  }
  if (!body.password) {
    console.log(Error);
  }
  const alreadyExist = await User.findOne(body.email);
  if (alreadyExist) {
  }
};
