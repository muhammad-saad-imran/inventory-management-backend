import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import ApiError from "../Errors/ApiError";

export function handleErrors(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    res.status(400).send({ success: false, error: error.format() });
  } else if (error instanceof ApiError) {
    res.status(error.statusCode).send({
      success: false,
      error: { message: error.message, stack: error.stack },
    });
  } else {
    res.status(500).send({
      success: false,
      error: { message: "Internal Server Error", stack: error.stack },
    });
  }
}
