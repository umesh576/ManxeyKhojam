import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import AppliedOnPost from "../model/applyOnPost.model";
import User from "../model/user.model";
import { sendEmailOnAppliedPost } from "../utils/sendPostApplyEmail.utils";
import { sendReceiveApplyOnPostEmail } from "../utils/sendReceiveApplyOnPostemail.utils";
import Post from "../model/post.model";
import { checkUserCanApply } from "../utils/checkUserCanApply.utils";
import mongoose from "mongoose";

let appliedpostid: mongoose.Types.ObjectId;
export const applyOnpost = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const files = req.files as Partial<{
      coverLetter: Express.Multer.File[];
      resume: Express.Multer.File[];
    }>;
    // const resume = req.files["resume"].[0];
    const coverLetter = files.coverLetter?.[0];
    const resume = files.resume?.[0];

    if (!coverLetter || !resume) {
      throw new customError("coverLetter and resume needed", 404);
    }
    body.resume = [resume.path]; // Store file path in DB
    body.coverLetter = [coverLetter.path];
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

    // check if user applied already
    const isApplied = await checkUserCanApply(body.userId, body.postId);
    if (!isApplied) {
      res.status(401).json({
        status: "failed",
        message: "user can already applied on the post.",
        satatusCode: 401,
        data: isApplied,
      });
      return;
    }

    //user for admin for see who can applies
    const userAppliedDetails = await AppliedOnPost.create(body);
    console.log(userAppliedDetails);
    appliedpostid = userAppliedDetails._id;
    // check who can applying on the post and update the user schema

    // check user can can applies on which post and update the post schema
    // const post = await Post.findById(body.postId);
    // post?.aapliedUser.push(body.userId);
    // await post?.save();

    await Post.findByIdAndUpdate(
      body.postId,
      { $push: { aapliedUser: body.userId } },
      { new: true }
    );

    const user = await User.findById(body.userId);
    user?.appliedOnPost.push(userAppliedDetails._id);
    await user?.save();

    // send email details to user after user applied on post
    const html = ` <h1>You have successfully applied for the post.</h1>
  <p>The recruiter will reach out after verifying your details.</p> `;
    const userContent = {
      to: String(user?.email),
      subject: "Job Application Confirmation",
      html,
    };

    await sendEmailOnAppliedPost(userContent);

    // send email details to admin after user applied on post
    const html2 = `<h1>You can applied post sucessfully.</h1><br><p>Recuiter will reach you after verification your details.</p>`;
    const adminContent = {
      to: String(user?.email),
      subject: "Your application sucessfully send to the Recuiter.",
      html2,
    };

    await sendReceiveApplyOnPostEmail(adminContent);

    res.status(200).json({
      status: "success",
      message: "Post can sucessfully Applied.",
      satatusCode: 200,
      data: userAppliedDetails,
    });
  } catch (error) {
    const delSubmitApplication = await AppliedOnPost.findByIdAndDelete(
      appliedpostid
    );
    if (error instanceof customError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
        statusCode: error.statusCode,
      });
    }

    console.error("Application error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      statusCode: 500,
    });
  }
};

// delete applied on post
export const deleteApplyOnPost = async (req: Request, res: Response) => {
  const { applyOnPostId } = req.params;
  if (!applyOnPostId) {
    throw new customError(
      "aplyOnpost is nessaray for the delte the appplyOnpost",
      404
    );
  }

  const applliedPost = await AppliedOnPost.findById(applyOnPostId);
  if (!applliedPost) {
    throw new customError("applied post already deleted", 404);
  }

  console.log(applliedPost);
  // const delAppliedOnpost = await AppliedOnPost.findByIdAndDelete(applyOnPostId);
  // if (!delAppliedOnpost) {
  //   throw new customError("Aplliedonpost is not valid!", 404);
  // }
  res.status(200).json({
    status: "success",
    statusCode: 200,
    message: "User can document delete from the appliedOnpost",
    data: applliedPost,
  });
};

// see all aplliedOnpost
export const getAllAppliedPost = async (req: Request, res: Response) => {
  // const {applliedOnpostId} = req.params
  // if(!applliedOnpostId){
  //   throw new customError('applliedOnpostId is needed',404)
  // }

  const allAppliedPost = await AppliedOnPost.find();
  if (!allAppliedPost) {
    throw new customError("No user can apply.", 404);
  }
  res.status(200).json({
    status: "success",
    statusCode: 404,
    message: "All appllied on this post detail are here",
    data: allAppliedPost,
  });
};

// get applied post by id
export const getAppliedOnPostById = async (req: Request, res: Response) => {
  const appliedOnpostId = req.params.id;
  if (!appliedOnpostId) {
    throw new customError(
      "AppliedOppost id required for the find appliedOnPost",
      404
    );
  }

  const appliedOnpost = await AppliedOnPost.findById(appliedOnpostId);
  if (!appliedOnpost) {
    res.status(200).json({
      status: "success",
      statusCode: 404,
      message: " Appllied on post not found.",
      data: appliedOnpost,
    });
  }
  res.status(200).json({
    status: "success",
    statusCode: 404,
    message: "All appllied on post is successgully post",
    data: appliedOnpost,
  });
};
