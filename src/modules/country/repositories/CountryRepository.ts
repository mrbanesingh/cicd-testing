import { injectable } from "inversify";

import { RegexUtil } from "../../../common/utils/RegexUtil";

import { ICountryModel } from "../models/ICountryModel";
import { ICountryRepository } from "./ICountryRepository";
import { FilterParams } from "../models/FilterParams";
import { CountryModel } from "../models/CountryModel";
import MongooseDefaultHook from "../../../common/utils/MongooseDefaultHooks";

@injectable()
export class CountryRepository implements ICountryRepository {
  async create(data: ICountryModel): Promise<ICountryModel> {
    try {
      const countryData = new CountryModel(data);
      const countryResult = await countryData.save();
      return countryResult;
    } catch (error: any) {
      throw new Error(`Failed to create country: ${error}`);
    }
  }

  async update(countryCode: string, data: Partial<ICountryModel>): Promise<ICountryModel | null> {
    try {
      const countryModelInstance = new CountryModel(data);
      const { _id, ...input } = countryModelInstance;

      const countryResult = await CountryModel.findOneAndUpdate(
        {
          country_code: RegexUtil.createCaseInsensitiveRegex(countryCode),
        },
        { $set: input },
        { new: true }
      ).exec();

      return countryResult ? countryResult : null;
    } catch (error: any) {
      throw new Error(`Failed to update country: ${error}`);
    }
  }

  async findAll(filterParams: FilterParams): Promise<ICountryModel[]> {
    try {
      const offset = filterParams.offset;
      const limit = filterParams.limit;
      const search = filterParams.search;
      const application = filterParams.application;
      const query: any = {};
      if (search && search.length > 0) {
        query.name = { $regex: search, $options: "i" };
      }

      if (application && application.length > 0) {
        query.applications = { $regex: application, $options: "i" };
      }
      const countQuery = CountryModel.find(query);
      MongooseDefaultHook.applyDefaultConditions.call(countQuery);
      const count = await countQuery.countDocuments();
      const dataQuery = CountryModel.find(query).skip(offset).limit(limit).lean().sort({ name: 1 });
      const data = await dataQuery;
      const dataWithCount: ICountryModel[] = data.map((item) => ({
        ...item,
        count,
      }));
      return dataWithCount;
    } catch (error) {
      throw new Error(`Failed to fetch the media: ${error}`);
    }
  }

  async findByCode(countryCode: string): Promise<ICountryModel[] | null> {
    try {
      const existingCountry = await CountryModel.find({
        country_code: RegexUtil.createCaseInsensitiveRegex(countryCode),
      })
        .setOptions({ noDefaultConditions: false })
        .exec();
      return existingCountry.length > 0 ? existingCountry : null;
    } catch (error: any) {
      throw new Error(`Failed to find country by code: ${error}`);
    }
  }

  async delete(countryCode: string, data: Partial<ICountryModel>): Promise<ICountryModel | null> {
    try {
      const countryResult = await CountryModel.findOneAndUpdate(
        {
          country_code: RegexUtil.createCaseInsensitiveRegex(countryCode),
        },
        { $set: { ...data } },
        { new: true }
      ).exec();

      return countryResult ? countryResult : null;
    } catch (error: any) {
      throw new Error(`Failed to delete country: ${error}`);
    }
  }

  async exists(data: Partial<ICountryModel>): Promise<ICountryModel[] | null> {
    try {
      const { country_code: country_code_input, name: country_name_input } = data;
      const query: any = {};

      if (country_code_input) {
        query.country_code = RegexUtil.createCaseInsensitiveRegex(country_code_input);
      }

      if (country_name_input) {
        query.name = RegexUtil.createCaseInsensitiveRegex(country_name_input);
      }
      const result = await CountryModel.find(query).lean().exec();
      return result.length > 0 ? result : null;
    } catch (error: any) {
      throw new Error(`Failed to check if country exists: ${error}`);
    }
  }
}
