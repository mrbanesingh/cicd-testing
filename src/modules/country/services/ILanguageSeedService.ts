import { ILanguageSeedModel } from "../models/ILanguageSeedModel";

export interface ILanguageSeedService {
  getLanguageSeedData(): Promise<ILanguageSeedModel[]>;
  executeSeedData(): Promise<void>;
}
