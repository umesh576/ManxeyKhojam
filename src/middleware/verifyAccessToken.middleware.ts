// middleware/verifyToken.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const verifyJWtToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.acess_token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};
