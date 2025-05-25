import { applyPostDet } from "../@types/applyPost.type4s";
import { IApplyUser } from "../@types/applyUser.types";
import customError from "../middleware/errroHandler.middleware";
import ApplyPost from "../model/applyPost.model";
import User from "../model/user.model";

//apply post remmaning
export const applyPost = async (req: Request, res: Response) => {
  const { userId, postId } = req.body;
  // const  = body;
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
  const body = req.body;
  if (body === null) {
    throw new customError("provide data of user", 400);
  }
  if (!body.userId) {
    throw new customError("please provide the userId", 400);
  }
  if (!body.applyPostId) {
    throw new customError("please provide the applyPostId", 400);
  }

  const { applyPostId } = body.applyPostId;
  const cancelApply = await ApplyPost.findByIdAndDelete({ applyPostId });

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Your application is sucessfully canceled.",
    data: cancelApply,
  });
};

//for edit user apply data
export const editApplyPost = async (req: Request, res: Response) => {};
