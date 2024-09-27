import { NextFunction, Request, Response } from "express";
import UnauthorizedError from "../Errors/UnauthorizedError";
import { verifyToken } from "../utils/auth.utils";

export default function validateUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new UnauthorizedError("Authorization token is required ");
    }

    const decoded = verifyToken(token);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    throw error;
  }
}
