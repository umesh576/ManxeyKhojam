import User from "../model/user.model";

export const checkPostCreatedUser = async (useri: any, posti: any) => {
  console.log(useri, posti);

  const user = await User.findById(useri);
  console.log(user);
  let userCreatedPost = user?.createdPost[0];
  if (userCreatedPost === posti) {
    return true;
  }
};
