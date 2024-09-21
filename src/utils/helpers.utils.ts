import { NextFunction, Request, Response } from "express";

export function handleResponse(
  res: Response,
  data: any = {},
  statusCode: number = 200
) {
  res.send({ success: true, data }).status(statusCode);
}

export function requestHandlerWrapper(
  controllerFn: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerFn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
}

export function handleErrors(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.send({ success: false, err }).status(500);
}
