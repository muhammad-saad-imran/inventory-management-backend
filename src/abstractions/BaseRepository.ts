import {
  Attributes,
  CreationAttributes,
  DestroyOptions,
  FindOptions,
  Model,
  UpdateOptions,
} from "sequelize";
import { IRepository } from "./IRepository";

export abstract class BaseRepository<TModel extends Model>
  implements IRepository<TModel>
{
  constructor(private model: { new (): TModel } & typeof Model) {}

  async get(
    id: string,
    options?: FindOptions<Attributes<TModel>>
  ): Promise<TModel> {
    const entity = await this.model.findByPk<TModel>(id, options);

    if (entity) return entity;
    else throw Error("Entity not found");
  }

  async getAll(options?: FindOptions<Attributes<TModel>>): Promise<TModel[]> {
    return this.model.findAll<TModel>(options);
  }

  async create(newEntity: CreationAttributes<TModel>): Promise<TModel> {
    return this.model.create<TModel>(newEntity);
  }

  async updateOne(
    id: string,
    updateValues: Partial<Attributes<TModel>>
  ): Promise<TModel> {
    await this.model.update<TModel>(updateValues, {
      where: { id },
    } as unknown as UpdateOptions<TModel>);
    return this.get(id);
  }

  async updateMany(
    updateValues: Partial<Attributes<TModel>>,
    options: UpdateOptions<Attributes<TModel>>
  ): Promise<TModel[]> {
    await this.model.update<TModel>(updateValues, options);
    return this.getAll({ where: options.where });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({
      where: { id },
    } as unknown as DestroyOptions<TModel>);
  }
}
