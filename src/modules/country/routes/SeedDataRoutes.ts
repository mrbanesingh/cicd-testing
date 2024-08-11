import express, { Router } from "express";
import { Container, inject, injectable } from "inversify";
import { SeedDataController } from "../controllers/SeedDataController";

@injectable()
export class SeedDataRouter {
  public seeDataRouter: Router;

  constructor(@inject(SeedDataController) private seedDataController: SeedDataController) {
    this.seeDataRouter = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.seeDataRouter.get(
      "/languageCodeAndName",
      this.seedDataController.onGetLanguageCodeAndName.bind(this.seedDataController)
    );
    this.seeDataRouter.get(
      "/applicationCodeAndName",
      this.seedDataController.onGetApplicationCodeAndName.bind(this.seedDataController)
    );
    this.seeDataRouter.get(
      "/countryCodeAndName",
      this.seedDataController.onGetCountryCodeAndName.bind(this.seedDataController)
    );
    this.seeDataRouter.get("/languages", this.seedDataController.onGetLanguage.bind(this.seedDataController));
    this.seeDataRouter.get("/applications", this.seedDataController.onGetApplication.bind(this.seedDataController));
    this.seeDataRouter.get("/countries", this.seedDataController.onGetCountries.bind(this.seedDataController));

    this.seeDataRouter.get("/:countrycode", this.seedDataController.onGetCountry.bind(this.seedDataController));
  }
}
