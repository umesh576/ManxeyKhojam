import mongoose from "mongoose";
import User from "../model/user.model";

export const checkPostCreatedUser = async (
  useri: mongoose.ObjectId,
  posti: mongoose.ObjectId
) => {
  console.log(useri, posti);

  const user = await User.findById(useri);
  console.log(user);
};
