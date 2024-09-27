import { NextFunction, Request, Response } from "express";

export function handleResponse(
  res: Response,
  data: any = {},
  statusCode: number = 200
) {
  res.status(statusCode).send({ success: true, data });
}
