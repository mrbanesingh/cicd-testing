import { injectable } from "inversify";

import { RegexUtil } from "../../../common/utils/RegexUtil";
import { CountrySeedModel } from "../models/CountrySeedModel";
import { ICountrySeedRepository } from "./ICountrySeedRepository";
import { ICountrySeedModel } from "../models/ICountrySeedModel";

@injectable()
export class CountrySeedRepository implements ICountrySeedRepository {
  async findAll(): Promise<ICountrySeedModel[]> {
    try {
      const existingCountrySeed = await CountrySeedModel.find().lean();
      return existingCountrySeed;
    } catch (error: any) {
      throw new Error(
        `An error occurred while retrieving country seed data: ${error}`
      );
    }
  }

  async insertSeedData(
    countrySeed: ICountrySeedModel
  ): Promise<ICountrySeedModel> {
    try {
      const result = await CountrySeedModel.create(countrySeed);
      return result;
    } catch (error: any) {
      throw new Error(`Failed to insert country seed data: ${error}`);
    }
  }

  async checkSeedData(
    countrySeed: ICountrySeedModel
  ): Promise<ICountrySeedModel | null> {
    try {
      const {
        country_code,
        name,
        display_name,
        mobile_number_prefix,
        local_currency_symbol,
        local_currency_name,
        flag_base_url,
        flag_location_url,
      } = countrySeed;

      const result = await CountrySeedModel.findOne({
        country_code: RegexUtil.createCaseInsensitiveRegex(country_code),
        name: RegexUtil.createCaseInsensitiveRegex(name),
        display_name: RegexUtil.createCaseInsensitiveRegex(display_name),
        mobile_number_prefix,
        local_currency_symbol,
        local_currency_name,
        flag_base_url,
        flag_location_url,
      }).exec();

      return result;
    } catch (error: any) {
      throw new Error(`Failed to check country seed data: ${error}`);
    }
  }
}
