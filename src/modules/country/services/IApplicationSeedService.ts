import { IApplicationSeedModel } from "../models/IApplicationSeedModel";

export interface IApplicationSeedService {
  getApplicationSeedData(): Promise<IApplicationSeedModel[]>;
  executeSeedData(): Promise<void>;
}
