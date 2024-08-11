import { Router } from "express";

import { CountryController } from "../controllers/CountryController";
import { inject, injectable } from "inversify";
import { JwtValidator } from "../../../middlewares/JwtValidator";

@injectable()
export class CountryRouter {
  public countryRouter: Router;

  constructor(@inject(CountryController) private countryController: CountryController) {
    this.countryRouter = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.countryRouter.get("/", JwtValidator, this.countryController.onGetCountries.bind(this.countryController));
    this.countryRouter.get(
      "/:code",
      JwtValidator,
      this.countryController.onGetCountryByCode.bind(this.countryController)
    );
    this.countryRouter.post("/", JwtValidator, this.countryController.onCreateCountry.bind(this.countryController));
    this.countryRouter.put(
      "/:countryCode",
      JwtValidator,
      this.countryController.onUpdateCountry.bind(this.countryController)
    );
    this.countryRouter.delete(
      "/:countryCode",
      JwtValidator,
      this.countryController.onDeleteCountry.bind(this.countryController)
    );
    // Add more routes here as needed
  }
}
