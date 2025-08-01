import { Request, Response } from "express";
// import { sendJobAcceptMessage } from "../utils/sendjobAcceptmessage.utils";
import customError from "../middleware/errroHandler.middleware";
import AppliedOnPost from "../model/applyOnPost.model";
import AcceptInterview from "../model/acceptInterview.model";
import { sendJobAcceptMessage } from "../utils/sendjobAcceptmessage.utils";

export const sendAcceptMessage = async (req: Request, res: Response) => {
  const { applyOnpostId, interviewDate, interviewTime, place } = req.body;

  if (!applyOnpostId || !interviewDate || !interviewTime || !place) {
    throw new customError(
      "All data neede for send the mail and accept the request",
      404
    );
  }

  const appliedPostUser = await AppliedOnPost.findById(applyOnpostId);
  //   console.log(appliedPostUser);
  if (!appliedPostUser) {
    res.status(404).json({
      status: "failed",
      statusCode: 404,
      message: "Post cannot be applied.",
      data: appliedPostUser,
    });
  }

  //   const appliedUser = appliedPostUser?.userId;

  const acceptUserRequest = await AcceptInterview.create({
    applyOnpostId,
    interviewDate,
    interviewTime,
    place,
    userId: appliedPostUser?.userId,
  });

  if (!acceptUserRequest) {
    throw new customError("Database problem.", 404);
  }

  const html = `<h1>Congratulation for accecpt for job.</h1><div>You application is acctepted by the company. your interview is schedule in <p>Date: ${interviewDate}</p>
     <p>Time: ${interviewTime}</p> 
     <p>Loacation: ${place}</p>
     <p>Hope you will be in time at the interview place with your all document.</p>
     <p>For any confusion you can contact at this number ${process.env.ADMIN_NUMBER} or email ${process.env.ADMIN_EMAIL}</p>
     </div>`;

  const mailContent = {
    to: String(appliedPostUser?.email),
    subject: "You are accepted for this job.",
    html,
  };

  await sendJobAcceptMessage(mailContent);

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "applied post can fetch sucessfully",
    data: acceptUserRequest,
  });
};

export const getAllAcceptInterviewPost = async (
  req: Request,
  res: Response
) => {
  const { accpetInterviewID } = req.body;
};
