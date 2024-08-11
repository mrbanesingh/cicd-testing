import { FilterParams } from "../models/FilterParams";
import { ICountryModel } from "../models/ICountryModel";

export interface ICountryService {
  createCountry(input: any): Promise<any>;
  updateCountry(countryCode: string, data: Partial<ICountryModel>): Promise<ICountryModel | null>;
  getCountry(filterParams: FilterParams): Promise<any>;
  checkCountryByCode(countryCode: string): Promise<ICountryModel[] | null>;
  deleteCountry(countryCode: string, data: Partial<ICountryModel>): Promise<ICountryModel | null>;
  getCountryPayload(userId: string, input: any): Promise<any>;
  countryExists(data: Partial<ICountryModel>): Promise<ICountryModel[] | null>;
}
