import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import AppliedOnPost from "../model/applyOnPost.model";
import User from "../model/user.model";
import { sendEmailOnAppliedPost } from "../utils/sendPostApplyEmail.utils";
import { sendReceiveApplyOnPostEmail } from "../utils/sendReceiveApplyOnPostemail.utils";
import Post from "../model/post.model";

export const applyOnpost = async (req: Request, res: Response) => {
  const body = req.body;
  const files = req.files as {
    coverLetter: Express.Multer.File[];
    resume: Express.Multer.File[]; // optional if used
  };
  // const resume = req.files["resume"].[0];
  const coverLetter = files.coverLetter[0];
  const resume = files.resume[0];

  if (!coverLetter || !resume) {
    throw new customError("coverLetter and resume needed", 404);
  }
  // console.log(body);
  if (
    !body.userId ||
    !body.postId ||
    !body.experience ||
    !body.firstName ||
    !body.lastname
  ) {
    throw new customError("Please provide all required details", 400);
  }

  //user for admin for see who can applies
  const userAppliedDetails = AppliedOnPost.create(body);

  // check who cna applying on the post and update the user schema
  const user = await User.findById(body.userId);
  user?.appliedOnPost.push((await userAppliedDetails)._id);
  await user?.save();

  // check user can can applies on which post and update the post schema
  const post = await Post.findById(body.postId);
  post?.aapliedUser.push(body.userId);
  await post?.save();

  // send email details to user after user applied on post
  const html = `<h1>You can applied post sucessfully.</h1><br><p>Recuiter will reach you after verification your details.</p>`;
  const userContent = {
    to: String(user?.email),
    subject: "Reset password pin",
    html,
  };

  await sendEmailOnAppliedPost(userContent);

  // send email details to admin after user applied on post
  const html2 = `<h1>You can applied post sucessfully.</h1><br><p>Recuiter will reach you after verification your details.</p>`;
  const adminContent = {
    to: String(user?.email),
    subject: "Reset password pin",
    html2,
  };

  await sendReceiveApplyOnPostEmail(adminContent);

  res.status(200).json({
    status: "success",
    message: "Post can sucessfully Applied.",
    satatusCode: 200,
    data: userAppliedDetails,
  });
};
