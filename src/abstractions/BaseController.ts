import { Request, Response } from "express";
import { Model } from "sequelize";
import { ZodType } from "zod";
import IConroller from "./IController";
import BaseService from "./BaseService";
import { handleResponse } from "../utils/helpers.utils";
import { ZodSchema } from "../type";

export default abstract class BaseController<T extends Model>
  implements IConroller
{
  private updateSchema: ZodType;

  constructor(private service: BaseService<T>, protected schema: ZodSchema) {
    this.updateSchema = schema.partial();
  }

  async get(req: Request, res: Response): Promise<void> {
    const entity = this.service.get(req.params.id);
    handleResponse(res, entity);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const allEntity = this.service.getAll();
    handleResponse(res, allEntity);
  }

  async create(req: Request, res: Response): Promise<void> {
    this.schema.parse(req.body);
    const newEntity = this.service.create(req.body);
    handleResponse(res, newEntity, 201);
  }

  async update(req: Request, res: Response): Promise<void> {
    this.updateSchema.parse(req.body);
    const updatedEntity = this.service.update(req.params.id, req.body);
    handleResponse(res, updatedEntity);
  }

  async delete(req: Request, res: Response): Promise<void> {
    this.service.delete(req.params.id);
    handleResponse(res);
  }
}
