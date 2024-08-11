import { inject, injectable } from "inversify";
import { IApplicationSeedService } from "./IApplicationSeedService";
import { IApplicationSeedModel } from "../models/IApplicationSeedModel";
import { IApplicationSeedRepository } from "../repositories/IApplicationSeedRepository";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import { EnumApplication } from "../../../common/enums/Application";

export const defaultApplication: IApplicationSeedModel[] = [
  { display_name: EnumApplication.ZEVO360, code: EnumApplication.ZEVO360 },
  { display_name: EnumApplication.ZENA360, code: EnumApplication.ZENA360 },
  { display_name: EnumApplication.ZOEY360, code: EnumApplication.ZOEY360 },
];

@injectable()
export class ApplicationSeedService implements IApplicationSeedService {
  private repository: IApplicationSeedRepository;

  constructor(
    @inject(IDENTIFIER.IApplicationSeedRepository)
    repository: IApplicationSeedRepository
  ) {
    this.repository = repository;
  }

  async getApplicationSeedData(): Promise<IApplicationSeedModel[]> {
    try {
      return await this.repository.findAll();
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }

  async executeSeedData(): Promise<void> {
    try {
      for (const application of defaultApplication) {
        const existingApplication = await this.repository.checkSeedData(application);
        if (!existingApplication) {
          await this.repository.insertSeedData(application);
        } else {
          // Application already exists
        }
      }
    } catch (error: any) {
      throw new Error(`${error}`);
    }
  }
}
