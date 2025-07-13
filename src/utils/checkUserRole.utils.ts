import customError from "../middleware/errroHandler.middleware";
import User from "../model/user.model";

export const checkUserRole = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new customError("user is invailid.!", 404);
  }
  return user.role;
};
