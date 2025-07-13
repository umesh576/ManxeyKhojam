// import mongoose from "mongoose";
import customError from "../middleware/errroHandler.middleware";
import Post from "../model/post.model";

export const checkUserCanApply = async (userId: string, postId: string) => {
  if (!userId || !postId) {
    throw new customError(
      "Provide userId and postId for checking validation",
      400
    );
  }
  const post = await Post.findById(postId);
  //   console.log(post);
  if (!post) {
    throw new customError("!Cannot find post.", 404);
  }
  const appliedUser = post.aapliedUser;

  for (const applied of appliedUser) {
    if (applied.toString() === userId) {
      return false;
    }
  }
  return true;
};
