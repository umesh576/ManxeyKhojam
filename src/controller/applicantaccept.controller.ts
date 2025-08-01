import { Request, Response } from "express";
// import { sendJobAcceptMessage } from "../utils/sendjobAcceptmessage.utils";
import customError from "../middleware/errroHandler.middleware";
import AppliedOnPost from "../model/applyOnPost.model";
export const sendAcceptMessage = async (req: Request, res: Response) => {
  const { applyOnpostId } = req.params;
  console.log(applyOnpostId);
  if (!applyOnpostId) {
    throw new customError("user id needed for accept the request", 404);
  }

  const appliedPostUser = await AppliedOnPost.findById(applyOnpostId);

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "applied post can fetch sucessfully",
    data: appliedPostUser,
  });

  //   const emailSend = await sendJobAcceptMessage();
  //   console.log(emailSend);
};
