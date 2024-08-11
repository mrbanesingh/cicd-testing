import { inject, injectable } from "inversify";
import { ICountrySeedService } from "./ICountrySeedService";
import { ICountrySeedRepository } from "../repositories/ICountrySeedRepository";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import { ICountrySeedModel } from "../models/ICountrySeedModel";

export const defaultCountries: ICountrySeedModel[] = [
  {
    country_code: "USA",
    mobile_number_prefix: "+1",
    name: "United States of America",
    display_name: "United States of America",
    local_currency_symbol: "$",
    local_currency_name: "USD",
    flag_base_url: "https://zevo360-file-storage.s3.amazonaws.com/",
    flag_location_url: "user/13109/Personal/2024-06-04T11:06:22.812299404D2024-06-04-11-06-22_Japan.png",
    flag_url:
      "https://zevo360-file-storage.s3.amazonaws.com/user/13109/Personal/2024-06-04T11:06:22.812299404D2024-06-04-11-06-22_Japan.png",
  },
  {
    country_code: "GBR",
    mobile_number_prefix: "+44",
    name: "United Kingdom",
    display_name: "United Kingdom",
    local_currency_symbol: "£",
    local_currency_name: "GBP",
    flag_base_url: "https://zevo360-file-storage.s3.amazonaws.com/",
    flag_location_url: "user/13109/Personal/2024-06-04T06:27:19.030903480D2024-06-04-06-27-19_uk.png",
    flag_url:
      "https://zevo360-file-storage.s3.amazonaws.com/user/13109/Personal/2024-06-04T06:27:19.030903480D2024-06-04-06-27-19_uk.png",
  },
  {
    country_code: "IND",
    mobile_number_prefix: "+91",
    name: "India",
    display_name: "India",
    local_currency_symbol: "₹",
    local_currency_name: "INR",
    flag_base_url: "https://zevo360-file-storage.s3.amazonaws.com/",
    flag_location_url: "user/13109/Personal/2024-06-04T06:20:30.514085469D2024-06-04-06-20-30_India.png",
    flag_url:
      "https://zevo360-file-storage.s3.amazonaws.com/user/13109/Personal/2024-06-04T06:20:30.514085469D2024-06-04-06-20-30_India.png",
  },
];

@injectable()
export class CountrySeedService implements ICountrySeedService {
  private repository: ICountrySeedRepository;

  constructor(
    @inject(IDENTIFIER.ICountrySeedRepository)
    repository: ICountrySeedRepository
  ) {
    this.repository = repository;
  }

  async getCountrySeedData(): Promise<ICountrySeedModel[]> {
    try {
      return await this.repository.findAll();
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }

  async executeSeedData(): Promise<void> {
    try {
      for (const country of defaultCountries) {
        const existingCountry = await this.repository.checkSeedData(country);
        if (!existingCountry) {
          await this.repository.insertSeedData(country);
        } else {
        }
      }
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }
}
