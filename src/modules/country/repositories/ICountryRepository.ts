import { FilterParams } from "../models/FilterParams";
import { ICountryModel } from "../models/ICountryModel";

export interface ICountryRepository {
  create(data: ICountryModel): Promise<ICountryModel>;

  update(country_code: string, data: Partial<ICountryModel>): Promise<ICountryModel | null>;
  findAll(filterParams: FilterParams): Promise<ICountryModel[]>;
  findByCode(country_code: string): Promise<ICountryModel[] | null>;
  //findByName(country_name: string): Promise<ICountryModel[] | null>;
  exists(data: Partial<ICountryModel>): Promise<ICountryModel[] | null>;
  delete(country_code: string, data: Partial<ICountryModel>): Promise<ICountryModel | null>;
}
