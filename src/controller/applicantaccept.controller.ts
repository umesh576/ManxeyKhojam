import { Request, Response } from "express";
// import { sendJobAcceptMessage } from "../utils/sendjobAcceptmessage.utils";
import customError from "../middleware/errroHandler.middleware";
import AppliedOnPost from "../model/applyOnPost.model";
import AcceptInterview from "../model/acceptInterview.model";
import { sendJobAcceptMessage } from "../utils/sendjobAcceptmessage.utils";
import Post from "../model/post.model";

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

  const appliedPost = await AppliedOnPost.findById(applyOnpostId);
  if (!appliedPost) {
    throw new customError("Applied on post is not found", 404);
  }

  const post = await Post.findById(appliedPost.postId);
  if (!post) {
    throw new customError("post not found", 404);
  }

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

  post.acceptApplicant.push(acceptUserRequest._id);
  await post.save();

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
  // const { accpetInterviewID } = req.body;
  const postId = req.params.id;
  if (!postId) {
    throw new customError("PostId need for see the accepted user", 404);
  }

  const acceptApplicant = await AcceptInterview.find();
  if (!acceptApplicant) {
    throw new customError("No applicant are accepted.", 404);
  }

  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "Applicant are fetch sucessfully",
    data: acceptApplicant,
  });
  // const
};

const rejectUserApplication = async (req: Request, res: Response) => {
  const applliedOnPostId = req.params.id;
  if (!applliedOnPostId) {
    throw new customError("applliedOnPostId need for reject user user", 404);
  }
};
