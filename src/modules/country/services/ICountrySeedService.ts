import { ICountrySeedModel } from "../models/ICountrySeedModel";

export interface ICountrySeedService {
  getCountrySeedData(): Promise<ICountrySeedModel[]>;
  executeSeedData(): Promise<void>;
}
