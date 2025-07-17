import { Request, Response, NextFunction, RequestHandler } from "express";
import customError from "../middleware/errroHandler.middleware";
import Post from "../model/post.model";
// import mongoose from "mongoose";
import { checkUser } from "../middleware/checkUser.middleware";
import { deleteFiles } from "../utils/deleteFile";
// import User from "../model/employer.model";

//for creating post
// export const createPost = async (req: Request, res: Response) => {
//   const body = req.body;
//   const files = req.files as { photos?: Express.Multer.File[] };
//   console.log(body);

//   if (Object.keys(body).length == 0) {
//     throw new customError("All feild are empty. No post is done.", 400);
//   }
//   console.log(body);
//   const { userId } = body;

//   // const userPost = await User.findById(userId);
//   // console.log(userPost);
//   const userPost = await checkUser(userId);
//   if (!userPost) {
//     throw new customError("verify which user creating the post", 404);
//   }

//   userPost.createdPost.push(new mongoose.Types.ObjectId(userId));
//   // Set profile path if file exists
//   if (file) {
//     body.picturePost = file.path;
//   } else {
//     throw new customError("Profile image is required", 400);
//   }
//   const newPost = await Post.create(body);

//   res.status(200).json({
//     sucess: true,
//     message: "New post sucessfully created.",
//     statusCode: 200,
//     data: newPost,
//   });
// };
export const createPost = async (req: Request, res: Response) => {
  const body = req.body;
  const files = req.files as { photos?: Express.Multer.File[] }; // Type assertion for TypeScript

  // Validate required fields
  if (!body.title || !body.description) {
    throw new customError("Title and description are required", 400);
  }

  const { userId } = body;

  // Verify user exists
  const user = await checkUser(userId);
  if (!user) {
    throw new customError("User not found", 404);
  }

  // Process files
  // Process files (optional)
  let picturePaths: string[] = [];
  if (files?.photos && files.photos.length > 0) {
    picturePaths = files.photos.map((file) => file.path);
  }

  // Create post
  const newPost = await Post.create({
    ...body,
    pictures: picturePaths,
    user: userId,
  });

  //Update user's createdPosts (correct way)
  user.createdPost.push(newPost._id);
  await user.save();

  // console.log("user update sucessfully", userUpdate);

  res.status(201).json({
    success: true,
    message: "Post successfully created",
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

  const post = await Post.findById(postId);
  if (post?.picturePost && post.picturePost.length > 0) {
    await deleteFiles(post.picturePost as string[]);
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

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required" });
    }

    const upPost = await Post.findById(postId);

    if (!upPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({
      status: "success",
      success: true,
      statusCode: 200,
      data: upPost,
    });
  } catch (error) {
    next(error); // Proper error handling
  }
};
