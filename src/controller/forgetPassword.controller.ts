import customError from "../middleware/errroHandler.middleware";
import { Request, Response } from "express";
import User from "../model/user.model";
import { generateOtp } from "../utils/generateOtp.utils";
import { sendOtp } from "../utils/sendForgetPin.utils";

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

    const forgetPin = generateOtp();

    const html = `Your Otp code is ${forgetPin} and please enter pin for the reset the password.`;
    const userDetails = {
      to: isUser.email,
      subject: "Reset password pin",
      html,
    };

    console.log(isUser._id);
    const upOtUser = await User.findByIdAndUpdate(
      isUser._id,
      { createOtp: forgetPin },
      { new: true }
    );
    console.log(upOtUser);
    await sendOtp(userDetails);

    const cookieData = {
      email,
      forgetPin,
    };
    console.log(cookieData);
    res
      .cookie("checkOtp", JSON.stringify(cookieData), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({
        status: 200,
        statusCode: 200,
        message: "OTP can sucessfully send.",
        data: forgetPin,
      });
  } catch (error) {
    console.log(error);
  }
};
