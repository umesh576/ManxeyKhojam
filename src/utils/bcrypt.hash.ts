import bcrypt from "bcrypt";

export const hash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword;
};

export const compare = async (plaintext: string, password: string) => {
  const userFound = await bcrypt.compare(plaintext, password);
  return userFound;
};
