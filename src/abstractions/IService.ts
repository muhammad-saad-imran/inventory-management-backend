import { Attributes, CreationAttributes, Model, Transaction } from "sequelize";

export default interface IService<T extends Model> {
  get(id: string): Promise<T>;
  getAll(): Promise<T[]>;
  create(
    newEntity: CreationAttributes<T>,
    transaction?: Transaction
  ): Promise<T>;
  update(
    id: string,
    updateEntity: Partial<Attributes<T>>,
    transaction?: Transaction
  ): Promise<T>;
  delete(id: string, transaction?: Transaction): Promise<T>;
}
