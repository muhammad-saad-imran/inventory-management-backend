import { Request, Response } from "express";
import { Model } from "sequelize";
import { ZodType } from "zod";
import { IConroller } from "./IController";
import { BaseService } from "./BaseService";
import { handleResponse } from "../utils/helpers.utils";

export abstract class BaseController<T extends Model> implements IConroller {
  constructor(
    private service: BaseService<T>,
    private createSchema: ZodType,
    private updateSchema: ZodType,
    private querySchema: ZodType
  ) {}

  async get(req: Request, res: Response): Promise<void> {
    this.querySchema.parse(req.query);
    const entity = this.service.get(req.query.id as string);
    handleResponse(res, entity);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const allEntity = this.service.getAll();
    handleResponse(res, allEntity);
  }

  async create(req: Request, res: Response): Promise<void> {
    this.createSchema.parse(req.body);
    const newEntity = this.service.create(req.body);
    handleResponse(res, newEntity, 201);
  }

  async update(req: Request, res: Response): Promise<void> {
    this.querySchema.parse(req.query);
    this.updateSchema.parse(req.body);
    const updatedEntity = this.service.update(req.query.id as string, req.body);
    handleResponse(res, updatedEntity);
  }

  async delete(req: Request, res: Response): Promise<void> {
    this.querySchema.parse(req.query);
    this.service.delete(req.query.id as string);
    handleResponse(res);
  }
}
