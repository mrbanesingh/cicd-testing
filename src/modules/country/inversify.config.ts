import { ContainerModule, interfaces } from "inversify";
import { CountryController } from "./controllers/CountryController";
import { CountryRepository } from "./repositories/CountryRepository";
import { ICountryRepository } from "./repositories/ICountryRepository";
import { CountryService } from "./services/CountryService";
import { ICountryService } from "./services/ICountryService";
import { IDENTIFIER } from "../../common/constants/identifiers";
import { CountryRouter } from "./routes/CountryRoutes";
import { CountrySeedRepository } from "./repositories/CountrySeedRepository";
import { ICountrySeedRepository } from "./repositories/ICountrySeedRepository";
import { ICountrySeedService } from "./services/ICountrySeedService";
import { CountrySeedService } from "./services/CountrySeedService";
import { IApplicationSeedRepository } from "./repositories/IApplicationSeedRepository";
import { SeedDataController } from "./controllers/SeedDataController";
import { ApplicationSeedRepository } from "./repositories/ApplicationSeedRepository";
import { ILanguageSeedRepository } from "./repositories/ILanguageSeedRepository";
import { LanguageSeedRepository } from "./repositories/LanguageSeedRepository";
import { ApplicationSeedService } from "./services/ApplicationSeedService";
import { IApplicationSeedService } from "./services/IApplicationSeedService";
import { ILanguageSeedService } from "./services/ILanguageSeedService";
import { LanguageSeedService } from "./services/LanguageSeedService";
import { SeedDataRouter } from "./routes/SeedDataRoutes";

const CountryContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICountryRepository>(IDENTIFIER.ICountryRepository).to(CountryRepository);
  bind<ICountryService>(IDENTIFIER.ICountryService).to(CountryService);
  bind<CountryController>(CountryController).toSelf();
  bind<CountryRouter>(CountryRouter).toSelf();
});

const SeedDataContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ICountrySeedRepository>(IDENTIFIER.ICountrySeedRepository).to(
    CountrySeedRepository
  );
  bind<ICountrySeedService>(IDENTIFIER.ICountrySeedService).to(
    CountrySeedService
  );
  bind<IApplicationSeedRepository>(IDENTIFIER.IApplicationSeedRepository).to(
    ApplicationSeedRepository
  );
  bind<IApplicationSeedService>(IDENTIFIER.IApplicationSeedService).to(
    ApplicationSeedService
  );
  bind<ILanguageSeedRepository>(IDENTIFIER.ILanguageSeedRepository).to(
    LanguageSeedRepository
  );
  bind<ILanguageSeedService>(IDENTIFIER.ILanguageSeedService).to(
    LanguageSeedService
  );
  bind<SeedDataController>(SeedDataController).toSelf();
  bind<SeedDataRouter>(SeedDataRouter).toSelf();
});

export { CountryContainer, SeedDataContainer };
