import { ICategoryModel } from "../models/ICategoryModel";

export interface ICategoryRepository {
  findAll(offset: number, limit: number, search: string): Promise<ICategoryModel[]>;
  delete(categoryCode: string, data: Partial<ICategoryModel>): Promise<ICategoryModel | null>;
  findByCode(categoryCode: string): Promise<ICategoryModel | null>;
  create(input: ICategoryModel): Promise<ICategoryModel>;
  update(categoryCode: string, data: Partial<ICategoryModel>): Promise<ICategoryModel | null>;
}
