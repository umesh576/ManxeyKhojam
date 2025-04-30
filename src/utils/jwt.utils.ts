import jwt from "jsonwebtoken";
import { Ipayload } from "../@types/role.jobseeker";
import customError from "../middleware/errroHandler.middleware";
import dotenv from "dotenv";
dotenv.config(); // 🔥 Loads .env variables into process.env

const JWT_SECRET = process.env.JWT_SECRET || "";
console.log(JWT_SECRET);
const TOKEN_EXP_IN = process.env.TOKEN_EXP_IN || "1h";
console.log(TOKEN_EXP_IN);

if (!JWT_SECRET) {
  throw new customError("Secret Token needed", 500);
}

export function generateToken(payload: Ipayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXP_IN as string });
}
