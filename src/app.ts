import dotenv from "dotenv";
import { mainContainer } from "./inversify.config";
import { IDENTIFIER } from "./common/constants/identifiers";
import { getSecretValue } from "./config/SecretManager";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import loggerMiddleware from "./middlewares/LoggerMiddleware";
import { IDatabaseProvider } from "./common/database/IDatabaseProvider";
import { AppSeedData } from "./app-seed-data";
import { checkEnvVariables } from "./config/Checkenv";
import { AppRoute } from "./routes/AppRoutes";
import { notFoundHandler } from "./middlewares/NotFoundHandler";
import { IMessageBrokerService } from "./integrations/message-broker/IMessageBrokerService";
import logger from "./middlewares/Logger";

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "./swagger-output.json"; // Adjust the path as needed

dotenv.config();

export const loadSecrets = async () => {
  try {
    const secretName = process.env.SECRET_NAME;
    const secretValue = await getSecretValue(secretName!);
    if (secretValue) {
      const secrets = JSON.parse(secretValue);
      Object.keys(secrets).forEach((key) => {
        process.env[key] = secrets[key];
      });
      //console.log(secrets);
      return 1;
    }
  } catch (error: any) {
    console.error("Failed to load secrets:", error);
    logger.error(error.stack);
  }
};

export const initializeMessageBroker = async () => {
  try {
    const messageBrokerService = mainContainer.get<IMessageBrokerService>(
      IDENTIFIER.IMessageBrokerService
    );
    await messageBrokerService.setupInitial();

    process.on("SIGINT", async () => {
      await messageBrokerService.closeConnection();
      //process.exit(0);
    });
  } catch (error: any) {
    console.error("Failed to initialize message broker:", error);
    throw new Error(`Failed to initialize message broker: ${error}`);
  }
};

export const initializeDatabase = async () => {
  const databaseProvider = mainContainer.get<IDatabaseProvider>(
    IDENTIFIER.IDatabaseProvider
  );
};

export const loadSeedData = async () => {
  const appSeedData = new AppSeedData();
  await appSeedData.loadApplicationSeedData();
};

export const initializeExpressApp = async () => {
  const app = express();
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  return app;
};

export const checkEnvironment = async () => {
  if (process.env.ENV === "local-dev") {
    checkEnvVariables();
  } else {
    await loadSecrets();
  }
};

export const initializeRoutes = (app: express.Application, path: string) => {
  const appRoute = mainContainer.get<AppRoute>(AppRoute);

  //app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(appRoute.router);
  console.log(`${path}health`);
  app.get(`${path}health`, (req, res) => {
    res
      .status(200)
      .json({ message: `Server is up and running on ${process.env.APP_PORT}` });
  });
};

export const initializeMiddlewares = (
  app: express.Application,
  path: string
) => {
  app.use("*", notFoundHandler);
  app.use(loggerMiddleware);
};
