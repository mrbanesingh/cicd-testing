import { injectable } from "inversify";
import { RegexUtil } from "../../../common/utils/RegexUtil";
import { ILanguageSeedRepository } from "./ILanguageSeedRepository";
import { ILanguageSeedModel } from "../models/ILanguageSeedModel";
import { LanguageSeedModel } from "../models/LanguageSeedModel";

@injectable()
export class LanguageSeedRepository implements ILanguageSeedRepository {
  async findAll(): Promise<ILanguageSeedModel[]> {
    try {
      const existingLanguages = await LanguageSeedModel.find(); //.select("-__v"); // Exclude the __v field; //.lean().exec();
      console.log(existingLanguages);
      return existingLanguages;
    } catch (error: any) {
      throw new Error(`Failed to retrieve all languages: ${error}`);
    }
  }

  async insertSeedData(
    language: ILanguageSeedModel
  ): Promise<ILanguageSeedModel> {
    try {
      return await LanguageSeedModel.create(language);
    } catch (error: any) {
      throw new Error(`Failed to insert language seed data: ${error}`);
    }
  }

  async checkSeedData(
    language: ILanguageSeedModel
  ): Promise<ILanguageSeedModel | null> {
    try {
      const { code, display_name } = language;
      const result = await LanguageSeedModel.findOne({
        code: RegexUtil.createCaseInsensitiveRegex(code),
        display_name: RegexUtil.createCaseInsensitiveRegex(display_name),
      }).exec();
      return result;
    } catch (error: any) {
      throw new Error(`Failed to check language seed data: ${error}`);
    }
  }
}
