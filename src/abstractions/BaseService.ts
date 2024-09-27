import { Attributes, CreationAttributes, Model, WhereOptions } from "sequelize";
import IService from "./IService";
import NotFoundError from "../Errors/NotFoundError";
import { ModelClass } from "../type";

export default abstract class BaseService<T extends Model>
  implements IService<T>
{
  constructor(private model: ModelClass<T>) {}

  async get(id: string): Promise<T> {
    const entity = await this.model.findByPk<T>(id);
    if (entity) {
      return entity;
    } else {
      throw new NotFoundError();
    }
  }

  getAll(): Promise<T[]> {
    return this.model.findAll<T>();
  }

  create(newEntity: CreationAttributes<T>): Promise<T> {
    return this.model.create<T>(newEntity);
  }

  async update(id: string, updateValues: Partial<Attributes<T>>): Promise<T> {
    await this.model.update(updateValues, { where: { id } as WhereOptions });
    return this.get(id);
  }

  async delete(id: string): Promise<T> {
    const entity = this.get(id);
    await this.model.destroy({ where: { id } as WhereOptions });
    return entity;
  }
}
