import express, { NextFunction, Request, Response, Router } from "express";
import { Model } from "sequelize";
import { IRoute } from "./IRoute";
import { BaseController } from "./BaseController";
import { requestHandlerWrapper } from "../utils/helpers.utils";
import { HTTP_METHOD } from "./type";

export abstract class BaseRoute<T extends Model> implements IRoute {
  protected router: Router = express.Router();

  constructor(
    private routeName: string,
    private controller: BaseController<T>
  ) {
    this.loadRoutes();
  }

  request(
    method: HTTP_METHOD,
    controllerFn: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>,
    requestPath: string = ""
  ) {
    const path = `/api/${this.routeName}/${requestPath}`;
    const requestHandler = requestHandlerWrapper(controllerFn);

    switch (method) {
      case HTTP_METHOD.GET:
        this.router.get(path, requestHandler);
        break;
      case HTTP_METHOD.POST:
        this.router.post(path, requestHandler);
        break;
      case HTTP_METHOD.PATCH:
        this.router.patch(path, requestHandler);
        break;
      case HTTP_METHOD.PUT:
        this.router.put(path, requestHandler);
        break;
      case HTTP_METHOD.DELETE:
        this.router.delete(path, requestHandler);
        break;
    }
  }

  loadRoutes(): void {
    this.request(HTTP_METHOD.GET, this.controller.getAll);
    this.request(HTTP_METHOD.GET, this.controller.get, ":id");
    this.request(HTTP_METHOD.POST, this.controller.create);
    this.request(HTTP_METHOD.PATCH, this.controller.update, ":id");
    this.request(HTTP_METHOD.DELETE, this.controller.update, ":id");
  }

  getRouter(): Router {
    return this.router;
  }
}
