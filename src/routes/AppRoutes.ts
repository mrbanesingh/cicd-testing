import appSetting from "../config";
import dotenv from "dotenv";
import { Router } from "express";

import { CountryRouter } from "../modules/country/routes/CountryRoutes";
import { SeedDataRouter } from "../modules/country/routes/SeedDataRoutes";
import { CategoryRouter } from "../modules/category/routes/CategoryRoutes";
import { inject, injectable } from "inversify";

@injectable()
export class AppRoute {
  public router: Router;

  constructor(
    @inject(CountryRouter) private countryRouter: CountryRouter,
    @inject(SeedDataRouter) private seedDataRouter: SeedDataRouter,
    @inject(CategoryRouter) private categoryRouter: CategoryRouter
  ) {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    dotenv.config();
    const path = `/${appSetting.API_URL}/${appSetting.API_VERSION}`;

    this.router.use(`${path}/country`, this.countryRouter.countryRouter);
    this.router.use(`${path}/seed`, this.seedDataRouter.seeDataRouter);
    this.router.use(`${path}/categories`, this.categoryRouter.categoryRouter);
  }
}
