import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import User from "../model/user.model";
import { hash } from "../utils/bcrypt.hash";

export const resetPassword = async (req: Request, res: Response) => {
  const storedData = JSON.parse(req.cookies.checkOtp);
  console.log(storedData);

  const storedOtp = parseInt(storedData.forgetPin);
  const userEmail = storedData.email;
  const userEntOtp = parseInt(req.body.userOtp);
  const newPassword = req.body.password;

  const isOtpOk = storedOtp === userEntOtp;
  console.log(isOtpOk);
  if (!isOtpOk) {
    throw new customError("Your OTP is not matched.", 400);
  }
  if (!userEmail) {
    throw new customError("something wrong", 404);
  }
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new customError("user unable to find", 400);
  }

  const userId = user._id.toString();
  console.log(userId);
  if (!userId) {
    throw new customError("No User deceted for password reset", 400);
  }
  const newHashPassword = await hash(newPassword);
  const userUpdated = await User.findByIdAndUpdate(
    userId,
    {
      password: newHashPassword,
    },
    { new: true }
  );

  res.clearCookie("checkOtp");

  res.status(200).json({
    status: "sucess",
    statusCode: 200,
    message: "nice man",
    data: userUpdated,
  });
};
