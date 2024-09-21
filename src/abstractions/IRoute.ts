import { Express, Router } from "express";

export interface IRoute {
  loadRoutes(): void;
  getRouter(app: Express): Router;
}
