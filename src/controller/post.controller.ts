import { Request, Response } from "express";
import customError from "../middleware/errroHandler.middleware";
import Post from "../model/post.model";

//for creating post
export const createPost = async (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);

  if (Object.keys(body).length == 0) {
    throw new customError("All feild are empty. No post is done.", 400);
  }

  const newPost = await Post.create(body);

  res.status(200).json({
    sucess: true,
    message: "New post sucessfully created.",
    statusCode: 200,
    data: newPost,
  });
};

//for GetAll post
export const getAllPost = async (req: Request, res: Response) => {
  const allPost = await Post.find();
  res.status(200).json({
    sucess: true,
    statusCode: 200,

    message: "All post can get sucessfully.",
    data: allPost,
  });
};

//for deletePost
export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.body;
  if (!postId) {
    throw new customError("please conform Which post to delete", 400);
  }

  const delPost = await Post.findByIdAndDelete(postId);

  res.status(200).json({
    sucess: true,
    message: "post deleted sucessfully",
    statusCode: 200,
    data: delPost,
  });
};

// for update Post
export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      throw new customError("Please verify the post for update.", 400);
    }

    const updPost = await Post.findByIdAndUpdate(
      postId,
      {
        title: req.body.title,
        description: req.body.description,
        qualification: req.body.qualification,
        salary: req.body.salary,
        experience: req.body.experience,
        picturePost: req.body.picturePost,
      },
      { new: true }
    );
    console.log(updPost);
    res.status(200).json({
      sucess: true,
      statusCode: 200,
      message: "Post can update sucessfully.",
      data: updPost,
    });
  } catch (error) {
    console.log(error);
  }
};

//get post by id use in frontend if needed
export const getPostById = async (req: Request, res: Response) => {
  const { postId } = req.body;
  if (!postId) {
    throw new customError("post Invalid!", 404);
  }
  const upPost = await Post.findById(postId);
  res.status(200).json({
    status: "sucess",
    success: true,
    statusCode: 200,
    data: upPost,
  });
};
