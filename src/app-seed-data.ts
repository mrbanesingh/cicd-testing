import logger from "./middlewares/Logger";
import { ApplicationSeedRepository } from "./modules/country/repositories/ApplicationSeedRepository";
import { CountrySeedRepository } from "./modules/country/repositories/CountrySeedRepository";
import { IApplicationSeedRepository } from "./modules/country/repositories/IApplicationSeedRepository";
import { ICountrySeedRepository } from "./modules/country/repositories/ICountrySeedRepository";
import { ILanguageSeedRepository } from "./modules/country/repositories/ILanguageSeedRepository";
import { LanguageSeedRepository } from "./modules/country/repositories/LanguageSeedRepository";
import { ApplicationSeedService } from "./modules/country/services/ApplicationSeedService";
import { CountrySeedService } from "./modules/country/services/CountrySeedService";
import { IApplicationSeedService } from "./modules/country/services/IApplicationSeedService";
import { ICountrySeedService } from "./modules/country/services/ICountrySeedService";
import { ILanguageSeedService } from "./modules/country/services/ILanguageSeedService";
import { LanguageSeedService } from "./modules/country/services/LanguageSeedService";

export class AppSeedData {
  private languageRepository: ILanguageSeedRepository;
  private languagesService: ILanguageSeedService;

  private applicationRepository: IApplicationSeedRepository;
  private applicationService: IApplicationSeedService;

  private countryRepository: ICountrySeedRepository;
  private countryService: ICountrySeedService;

  constructor() {
    this.languageRepository = new LanguageSeedRepository();
    this.languagesService = new LanguageSeedService(this.languageRepository);

    this.applicationRepository = new ApplicationSeedRepository();
    this.applicationService = new ApplicationSeedService(
      this.applicationRepository
    );

    this.countryRepository = new CountrySeedRepository();
    this.countryService = new CountrySeedService(this.countryRepository);
  }

  async loadApplicationSeedData(): Promise<void> {
    try {
      // Insert default data for language seeds
      try {
        await this.languagesService.executeSeedData();
      } catch (error: any) {
        logger.error(error.stack);
      }

      // Insert default data for application seeds
      try {
        await this.applicationService.executeSeedData();
      } catch (error: any) {
        logger.error(error.stack);
      }

      // Insert default data for country seeds
      try {
        await this.countryService.executeSeedData();
      } catch (error: any) {
        logger.error(error.stack);
      }
    } catch (error) {
      // process.exit(1);
    }
  }
}
