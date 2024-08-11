import { IDatabaseProvider } from "./database/IDatabaseProvider";
import MongoDBProvider from "./database/MongoDBProvider";
import { IDENTIFIER } from "./constants/identifiers";
import { ContainerModule, interfaces } from "inversify";

const DatabaseProviderContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<IDatabaseProvider>(IDENTIFIER.IDatabaseProvider)
    .toDynamicValue(() => MongoDBProvider.getInstance())
    .inSingletonScope();
});

export { DatabaseProviderContainer };
