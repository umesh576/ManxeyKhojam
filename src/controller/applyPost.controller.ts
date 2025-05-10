import { IApplyUser } from "../@types/applyUser.types";
import customError from "../middleware/errroHandler.middleware";
import ApplyPost from "../model/applyPost.model";
import User from "../model/user.model";

//apply post remmaning
export const applyPost = async (req: Request, res: Response) => {
  const body = req.body;
  const { userId, postId } = body;
  if (!postId) {
    throw new customError("Please verify you are apply in which post.", 400);
  }
  if (!userId) {
    throw new customError("Please verify who you are apply in this post.", 400);
  }
  const userApply = await User.findById(userId);
  if (!userApply) {
    throw new customError("Please Register first for applying the post.", 400);
  }

  const userDetails: IApplyUser = {
    firsName: userApply.firstName,
    lastName: userApply.lastName,
    skill: userApply.skill,
    phoneNumber: userApply.phoneNumber,
    address: userApply.address,
    email: userApply.email,
  };

  const appPost = await ApplyPost.create({ userId, postId, userDetails });
  res.status(200).json({
    status: true,
    statusCode: 200,
    message: "Applied your form sucessfully.",
    data: appPost,
  });
};

//cancel apply post
export const cancelApplyPost = async (req: Request, res: Response) => {
  const { userId, applyPostId } = req.body;

  if (!userId) {
    throw new customError("please provide the userId", 400);
  }
  if (!applyPostId) {
    throw new customError("please provide the userId", 400);
  }
  const userCancel = await User.findById(userId);
  if (userCancel?.createdAt >= Number(Date().concat) + 5) {
    throw new customError("Unable to cancel your form", 400);
  }
  const cancelApply = await ApplyPost.findByIdAndDelete(applyPostId);

  res.status(200).json({
    sucess: true,
    statusCode: 200,
    message: "Your application is sucessfully created.",
    data: cancelApply,
  });
};
