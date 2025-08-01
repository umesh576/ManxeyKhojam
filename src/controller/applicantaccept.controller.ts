import { Request, Response } from "express";
import { sendJobAcceptMessage } from "../utils/sendjobAcceptmessage.utils";
import customError from "../middleware/errroHandler.middleware";
export const sendAcceptMessage = async (req: Request, res: Response) => {
  const body = req.body;
  if (!body.userId) {
    throw new customError("user id needed for accept the request", 404);
  }

  //   const emailSend = await sendJobAcceptMessage();
  //   console.log(emailSend);
};
