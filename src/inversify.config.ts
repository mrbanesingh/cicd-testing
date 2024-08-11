import { CountryContainer, SeedDataContainer } from "./modules/country/inversify.config";
import { AppRoute } from "./routes/AppRoutes";
import { DatabaseProviderContainer } from "./common/inversify.config";
import { MessagingBrokerContainer } from "./integrations/message-broker/inversify.config";
import { CategoryContainer } from "./modules/category/inversify.config";
import { Container } from "inversify";

const mainContainer = new Container();

// Load module-level containers
mainContainer.load(DatabaseProviderContainer);
mainContainer.load(CountryContainer);
mainContainer.load(CategoryContainer);
mainContainer.load(SeedDataContainer);
mainContainer.load(MessagingBrokerContainer);

mainContainer.bind<AppRoute>(AppRoute).toSelf();

export { mainContainer };
