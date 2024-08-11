import { ICountrySeedModel } from "../models/ICountrySeedModel";

export interface ICountrySeedRepository {
  findAll(): Promise<ICountrySeedModel[]>;
  insertSeedData(countrySeed: ICountrySeedModel): Promise<ICountrySeedModel>;
  checkSeedData(
    countrySeed: ICountrySeedModel
  ): Promise<ICountrySeedModel | null>;
}
