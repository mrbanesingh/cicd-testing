import "reflect-metadata";
import {
  checkEnvironment,
  initializeDatabase,
  initializeExpressApp,
  initializeMessageBroker,
  initializeMiddlewares,
  initializeRoutes,
  loadSecrets,
  loadSeedData,
} from "./app";

// Load environment variables
//dotenv.config();

const startServer = async () => {
  const app = await initializeExpressApp();
  const PORT = parseInt(`${process.env.APP_PORT}`);
  const path = `/${process.env.API_URL}/${process.env.API_VERSION}/`;

  await checkEnvironment();
  await initializeMessageBroker();
  await initializeDatabase();
  await loadSeedData();
  await initializeRoutes(app, path);
  await initializeMiddlewares(app, path);

  app.listen(PORT, () => {
    console.log("Listening to:", PORT);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
