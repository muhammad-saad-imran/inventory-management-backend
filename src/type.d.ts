import { Attributes, CreationAttributes, Model } from "sequelize";
import { ZodObject, ZodRawShape } from "zod";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export type ModelClass<T extends Model> = { new (): T } & typeof Model<
  Attributes<T>,
  CreationAttributes<T>
>;

export type ZodSchema = ZodObject<ZodRawShape>;
