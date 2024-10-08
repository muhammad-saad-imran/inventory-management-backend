import { Request, Response } from "express";
import { Model } from "sequelize";
import { ZodType } from "zod";
import IConroller from "./IController";
import BaseService from "./BaseService";
import { handleResponse } from "../utils/route.utils";
import { ZodSchema } from "../type";

export default abstract class BaseController<T extends Model>
  implements IConroller
{
  protected updateSchema: ZodType;

  constructor(private service: BaseService<T>, protected schema: ZodSchema) {
    this.updateSchema = schema.partial();
  }

  async get(req: Request, res: Response): Promise<void> {
    const entity = await this.service.get(req.params.id);
    handleResponse(res, entity);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const allEntity = await this.service.getAll();
    handleResponse(res, allEntity);
  }

  async create(req: Request, res: Response): Promise<void> {
    const createEntity: any = this.schema.parse(req.body);
    const newEntity = await this.service.create(createEntity);
    handleResponse(res, newEntity, 201);
  }

  async update(req: Request, res: Response): Promise<void> {
    const updateEntity: any = this.updateSchema.parse(req.body);
    const updatedEntity = await this.service.update(
      req.params.id,
      updateEntity
    );
    handleResponse(res, updatedEntity);
  }

  async delete(req: Request, res: Response): Promise<void> {
    await this.service.delete(req.params.id);
    handleResponse(res);
  }
}
