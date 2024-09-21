import {
  Attributes,
  CreationAttributes,
  FindOptions,
  Model,
  UpdateOptions,
} from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

export interface IRepository<T extends Model> {
  get(id: string, options?: FindOptions<Attributes<T>>): Promise<T>;
  getAll(options?: FindOptions<Attributes<T>>): Promise<T[]>;
  create(newEntity: CreationAttributes<T>): Promise<T>;
  updateOne(id: string, updateEntity: Partial<Attributes<T>>): Promise<T>;
  updateMany(
    updateEntity: Partial<Attributes<T>>,
    options: UpdateOptions<Attributes<T>>
  ): Promise<T[]>;
  delete(id: string): Promise<void>;
}
