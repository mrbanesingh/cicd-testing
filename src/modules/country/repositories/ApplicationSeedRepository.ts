import { injectable } from "inversify";

import { RegexUtil } from "../../../common/utils/RegexUtil";
import ApplicationSeedModel from "../models/ApplicationSeedModel";
import { IApplicationSeedModel } from "../models/IApplicationSeedModel";
import { IApplicationSeedRepository } from "./IApplicationSeedRepository";

@injectable()
export class ApplicationSeedRepository implements IApplicationSeedRepository {
  async findAll(): Promise<IApplicationSeedModel[]> {
    try {
      const existingApplication = await ApplicationSeedModel.find().lean();
      return existingApplication;
    } catch (error: any) {
      throw new Error(`Failed to retrieve application seeds: ${error}`);
    }
  }

  async insertSeedData(
    application: IApplicationSeedModel
  ): Promise<IApplicationSeedModel> {
    try {
      return await ApplicationSeedModel.create(application);
    } catch (error: any) {
      throw new Error(`Failed to insert seed data: ${error}`);
    }
  }

  async checkSeedData(
    application: IApplicationSeedModel
  ): Promise<IApplicationSeedModel | null> {
    try {
      const { code, display_name } = application;
      return await ApplicationSeedModel.findOne({
        code: RegexUtil.createCaseInsensitiveRegex(code),
        display_name: RegexUtil.createCaseInsensitiveRegex(display_name),
      }).exec();
    } catch (error: any) {
      throw new Error(`Failed to check seed data: ${error}`);
    }
  }
}
