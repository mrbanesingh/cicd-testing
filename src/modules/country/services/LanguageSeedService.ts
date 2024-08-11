import { injectable, inject } from "inversify";
import { ILanguageSeedModel } from "../models/ILanguageSeedModel";
import { ILanguageSeedService } from "./ILanguageSeedService";
import { ILanguageSeedRepository } from "../repositories/ILanguageSeedRepository";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import { EnumLanguage } from "../../../common/enums/Languages";

export const defaultLanguages: ILanguageSeedModel[] = [
  { display_name: EnumLanguage.ENGLISH, code: EnumLanguage.ENGLISH },
  { display_name: EnumLanguage.HINDI, code: EnumLanguage.HINDI },
];

@injectable()
export class LanguageSeedService implements ILanguageSeedService {
  private repository: ILanguageSeedRepository;

  constructor(
    @inject(IDENTIFIER.ILanguageSeedRepository)
    repository: ILanguageSeedRepository
    // @inject(IDENTIFIER.MessageBroker) broker: IMessageBroker
  ) {
    this.repository = repository;
    // this.broker = broker;
  }

  async getLanguageSeedData(): Promise<ILanguageSeedModel[]> {
    try {
      return await this.repository.findAll();
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }

  async executeSeedData(): Promise<void> {
    try {
      for (const language of defaultLanguages) {
        const existingLanguage = await this.repository.checkSeedData(language);
        if (!existingLanguage) {
          await this.repository.insertSeedData(language);
        } else {
        }
      }
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }
}
