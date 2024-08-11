import { ICategoryModel } from "../models/ICategoryModel";

export interface ICategoryService {
  createCategory(input: ICategoryModel): Promise<ICategoryModel>;
  checkCategoryByCode(categoryCode: any): Promise<ICategoryModel | null>;
  deleteCategory(categoryCode: any, data: Partial<ICategoryModel>): Promise<ICategoryModel>;
  updateCategory(categoryCode: string, input: ICategoryModel): Promise<ICategoryModel | null>;
  getCategory(offset: number, limit: number, search: string): Promise<ICategoryModel[]>;
  getCategoryPayload(userId: string, input: any): Promise<any>;
}
