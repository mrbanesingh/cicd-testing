import { ILanguageSeedModel } from "../models/ILanguageSeedModel";

export interface ILanguageSeedRepository {
  findAll(): Promise<ILanguageSeedModel[]>;
  insertSeedData(language: ILanguageSeedModel): Promise<ILanguageSeedModel>;
  checkSeedData(
    language: ILanguageSeedModel
  ): Promise<ILanguageSeedModel | null>;
}
