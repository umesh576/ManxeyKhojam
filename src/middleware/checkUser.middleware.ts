import User from "../model/user.model";
import customError from "./errroHandler.middleware";

export const checkUser = (userid: string) => {
  if (!userid) {
    throw new customError("provide userid", 404);
  }
  const isUser = User.findById(userid);
  return isUser;
};
