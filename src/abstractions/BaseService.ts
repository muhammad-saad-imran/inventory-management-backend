import { Attributes, CreationAttributes, Model } from "sequelize";
import { IService } from "./IService";
import { BaseRepository } from "./BaseRepository";

export abstract class BaseService<T extends Model> implements IService<T> {
  constructor(private repository: BaseRepository<T>) {}

  get(id: string): Promise<T> {
    return this.repository.get(id);
  }

  getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  create(newEntity: CreationAttributes<T>): Promise<T> {
    return this.repository.create(newEntity);
  }

  update(id: string, updateValues: Partial<Attributes<T>>): Promise<T> {
    return this.repository.updateOne(id, updateValues);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
