import { injectable } from "inversify";
import { ICategoryRepository } from "./ICategoryRepository";
import { CategoryModel } from "../models/CategoryModel";
import { ICategoryModel } from "../models/ICategoryModel";
import { RegexUtil } from "../../../common/utils/RegexUtil";
@injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor() {}
  async findAll(offset: number, limit: number, search: string): Promise<ICategoryModel[]> {
    try {
      const query: any = {
        is_deleted: false,
      };
      if (search && search.length > 0) {
        query.name = { $regex: search, $options: "i" };
      }
      const count = await CategoryModel.countDocuments(query);
      const data = await CategoryModel.find(query, null, { noDefaultConditions: true })
        .skip(offset)
        .limit(limit)
        .lean();
      const dataWithCount = data.map((item) => ({
        ...item,
        count,
      }));

      return dataWithCount as ICategoryModel[];
    } catch (error) {
      throw new Error(`Failed to fetch the media: ${error}`);
    }
  }
  async update(categoryCode: string, data: Partial<ICategoryModel>): Promise<ICategoryModel | null> {
    try {
      const mediaModel = new CategoryModel(data);
      const { category_code, _id, ...input } = mediaModel.toObject();
      const mediaResult = await CategoryModel.findOneAndUpdate(
        {
          category_code: categoryCode,
          is_deleted: false,
        },
        { $set: input },
        { new: true }
      )
        .setOptions({ noDefaultConditions: true })
        .exec();

      return mediaResult ? mediaResult : null;
    } catch (error: any) {
      throw new Error(`Failed to update media: ${error}`);
    }
  }

  async delete(categoryCode: any, data: Partial<ICategoryModel>): Promise<ICategoryModel | null> {
    try {
      const result = await CategoryModel.findOneAndUpdate(
        {
          category_code: categoryCode,
          is_deleted: false,
        },
        { $set: { is_deleted: true, ...data } },
        { new: true }
      )
        .setOptions({ noDefaultConditions: true })
        .exec();

      return result;
    } catch (error) {
      throw new Error(`Failed to fetch the media: ${error}`);
    }
  }

  async findByCode(categoryCode: string): Promise<ICategoryModel | null> {
    try {
      const existingCategory = await CategoryModel.findOne({
        category_code: categoryCode,
        is_deleted: false,
      })
        .setOptions({ noDefaultConditions: true })
        .exec();

      return existingCategory;
    } catch (error) {
      throw new Error(`Failed to fetch the category: ${error}`);
    }
  }

  async create(data: ICategoryModel): Promise<any> {
    try {
      const category = new CategoryModel(data);
      const result: any = await category.save();
      return result;
    } catch (error: any) {
      throw new Error(`Failed to create the category: ${error}`);
    }
  }
}
