import jwt, { JwtPayload } from "jsonwebtoken";
import { Ipayload } from "../@types/role.jobseeker";
import customError from "../middleware/errroHandler.middleware";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const TOKEN_EXP_IN = (process.env.TOKEN_EXP_IN ||
  "1h") as jwt.SignOptions["expiresIn"];

if (!JWT_SECRET) {
  throw new customError("Secret Token needed", 500);
}

export function generateToken(payload: Ipayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXP_IN, // Safe and clean
  });
}
// export function generateToken(payload: Ipayload): string {
//   return jwt.sign(payload, JWT_SECRET, {
//     expiresIn: TOKEN_EXP_IN,
//   });
// }
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
