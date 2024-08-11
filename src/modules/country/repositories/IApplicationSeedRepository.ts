import { IApplicationSeedModel } from "../models/IApplicationSeedModel";

export interface IApplicationSeedRepository {
  findAll(): Promise<IApplicationSeedModel[]>;
  insertSeedData(
    application: IApplicationSeedModel
  ): Promise<IApplicationSeedModel>;
  checkSeedData(
    application: IApplicationSeedModel
  ): Promise<IApplicationSeedModel | null>;
}
