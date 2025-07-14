import { NextFunction, Request, Response } from "express";
// import customError from "./errorhandler.middleware";
import customError from "./errroHandler.middleware";
import { Role } from "../@types/role.jobseeker";
// import { Role } from "../@types/global.types";
import { verifyToken } from "../utils/jwt.utils";
import User from "../model/user.model";

export const Authenticate = (
  roles?: Role[]
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers["authorization"] as string;

      if (!authHeader || !authHeader.startsWith("BEARER")) {
        throw new customError(
          "Unauthorized, Authorization header is missing",
          401
        );
      }

      const access_token = authHeader.split(" ")[1];

      if (!access_token) {
        throw new customError("Unauthorized, token is missing", 401);
      }

      const decoded = verifyToken(access_token);

      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        throw new customError("Unauthorized, access denied", 401);
      }

      if (!decoded) {
        throw new customError("Unauthorized, Invalid token", 401);
      }

      const user = await User.findById(decoded._id);

      if (!user) {
        throw new customError("User not found", 404);
      }

      if (roles && !roles.includes(user.role as Role)) {
        throw new customError(
          `Forbidden, ${user.role} can not access this resource`,
          401
        );
      }

      // ts-expect-error
      req.user = {
        _id: decoded._id,
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        role: decoded.role,
        email: decoded.email,
      };

      next();
    } catch (err: any) {
      // throw new customError(err?.message ?? "Something wend wrong", 500);
      next(err);
    }
  };
};
