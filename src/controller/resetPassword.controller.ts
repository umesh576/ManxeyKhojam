import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import User from "../model/user.model";
import { hash } from "../utils/bcrypt.hash";

export const resetPassword = async (req: Request, res: Response) => {
  const userEntOtp = parseInt(req.body.userOtp);
  const newPassword = req.body.password;

  const userEmail = await req.cookies.checkEmail;

  if (!userEmail) {
    throw new customError("Email cannot found on the cookie.", 404);
  }

  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new customError("user unable to find", 400);
  }

  const storedOtp = user?.createdOtp;

  if (!storedOtp) {
    throw new customError("please check otp cannot send to the user.", 404);
  }

  const isOtpOk = storedOtp === userEntOtp;

  if (!isOtpOk) {
    throw new customError("Your OTP is not matched.", 400);
  }

  const userId = user.id.toString();
  console.log(userId);
  if (!userId) {
    throw new customError("No User deceted for password reset", 400);
  }
  const newHashPassword = await hash(newPassword);
  const userUpdated = await User.findByIdAndUpdate(
    userId,
    {
      password: newHashPassword,
      createdOtp: null,
    },
    { new: true }
  );

  res.clearCookie("checkOtp");

  res.status(200).json({
    status: "sucess",
    statusCode: 200,
    message: "password sucessfully updated",
    data: userUpdated,
  });
};
