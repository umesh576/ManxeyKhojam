import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import AppliedOnPost from "../model/applyOnPost.model";
import User from "../model/user.model";
import { sendEmailOnAppliedPost } from "../utils/sendPostApplyEmail.utils";
import { sendReceiveApplyOnPostEmail } from "../utils/sendReceiveApplyOnPostemail.utils";
import Post from "../model/post.model";

export const applyOnpost = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
  // if (!body.userId) {
  //   throw new customError("Userid need for the validate user", 400);
  // }
  // if (!body.postId) {
  //   throw new customError("PostId required for verify post.", 400);
  // }
  // if (!body.experience || !body.resume || !body.firstName || !body.lastname) {
  //   throw new customError("Please provide the all details", 400);
  // }
  if (
    !body.userId ||
    !body.postId ||
    !body.experience ||
    !body.resume ||
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
