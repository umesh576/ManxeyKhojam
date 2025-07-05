// import { IApplyUser } from "../@types/applyUser.types";
import { checkPostCreatedUser } from "../middleware/checkPostCreatedUser";
import customError from "../middleware/errroHandler.middleware";
import ApplyPost from "../model/applyPost.model";
// import User from "../model/user.model";
// import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../model/user.model";
import Post from "../model/post.model";

//apply post remmaning
export const applyPost = async (req: Request, res: Response) => {
  const { userId, postId } = req.body;
  if (!postId) {
    throw new customError("Please verify you are apply in which post.", 400);
  }
  if (!userId) {
    throw new customError("Please verify who you are apply in this post.", 400);
  }

  // check the post was created by userr or not
  const isUserCreated = checkPostCreatedUser(userId, postId);
  if (!isUserCreated) {
    throw new customError("User cannot create this post", 404);
  }

  // find post for post detalils
  const applingPost = await Post.findById(postId);
  const user = await User.findById(userId);

  // create a applypost
  const appPosDet = {
    userId: userId,
    postId: postId,
    postDetails: applingPost,
  };
  const appPost = await ApplyPost.create(appPosDet);

  // add applied post in the user details
  user?.appliedPost.push(appPost._id);

  //remove created post from user details
  user?.createdPost.pop();
  await user?.save();

  res.status(200).json({
    status: true,
    statusCode: 200,
    message: "Applied your post sucessfully.",
    data: appPost,
  });
};

//cancel apply post
export const cancelApplyPost = async (req: Request, res: Response) => {
  const { userId, applyPostId } = req.body;
  // if (body === null) {
  //   throw new customError("provide data of user", 400);
  // }
  if (!userId) {
    throw new customError("please provide the userId", 400);
  }
  if (!applyPostId) {
    throw new customError("please provide the applyPostId", 400);
  }

  // const { applyPostId } = body.applyPostId;
  const cancelApply = await ApplyPost.findByIdAndDelete({ applyPostId });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Your application is sucessfully canceled.",
    data: cancelApply,
  });
};

//for edit user apply data
// export const editApplyPost = async (req: Request, res: Response) => {};
