import { Attributes, CreationAttributes, Model } from "sequelize";

export default interface IService<T extends Model> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  create(newEntity: CreationAttributes<T>): Promise<T>;
  update(id: string, updateEntity: Partial<Attributes<T>>): Promise<T>;
  delete(id: string): Promise<T>;
}
