import customError from "../middleware/errroHandler.middleware";
import { Request, Response } from "express";
import User from "../model/user.model";
import { sendOtp } from "../utils/sendForgetPin.middleware";

export const forgetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new customError("Email is must required for Reset password", 400);
    }

    const isUser = await User.findOne({ email });
    console.log(isUser);
    if (!isUser) {
      throw new customError("User is not exist with this email", 400);
    }

    const forgetPin = Math.floor(Math.random() * 10000);
    console.log(forgetPin);

    const html = `Your Otp code is ${forgetPin} and please enter pin for the reset the password.`;
    const userDetails = {
      to: isUser.email,
      subject: "Reset password pin",
      html,
    };
    await sendOtp(userDetails);
    res.status(200).json({
      status: 200,
      statusCode: 200,
      message: "OTP can sucessfully send.",
    });
  } catch (error) {
    console.log(error);
  }
};
