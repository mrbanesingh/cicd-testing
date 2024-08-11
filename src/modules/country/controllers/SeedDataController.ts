import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { EnumHttpStatusCode } from "../../../common/enums/HttpStatusCode";
import { createResponseDto } from "../../../dto/ResponseDTO";
import { EnumHttpStatusMessageType } from "../../../common/enums/HttpStatusMessageType";
import { AppMessages } from "../../../common/constants/AppMessages";
import { IApplicationSeedService } from "../services/IApplicationSeedService";
import { ILanguageSeedService } from "../services/ILanguageSeedService";
import { ICountrySeedService } from "../services/ICountrySeedService";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import { defaultCountries } from "../services/CountrySeedService";
import { defaultApplication } from "../services/ApplicationSeedService";
import { defaultLanguages } from "../services/LanguageSeedService";

@injectable()
export class SeedDataController {
  private languageSeedService: ILanguageSeedService;
  private applicationSeedService: IApplicationSeedService;
  private countrySeedService: ICountrySeedService;

  constructor(
    @inject(IDENTIFIER.ILanguageSeedService)
    languageSeedService: ILanguageSeedService,
    @inject(IDENTIFIER.IApplicationSeedService)
    applicationSeedService: IApplicationSeedService,
    @inject(IDENTIFIER.ICountrySeedService)
    countrySeedService: ICountrySeedService
  ) {
    this.languageSeedService = languageSeedService;
    this.applicationSeedService = applicationSeedService;
    this.countrySeedService = countrySeedService;
  }

  async onGetCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.countrySeedService.getCountrySeedData();
      res.json(
        createResponseDto(
          EnumHttpStatusCode.OK_200,
          EnumHttpStatusMessageType.SUCCESS_MESSAGE,
          AppMessages.SUCCESS,
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async onGetApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.applicationSeedService.getApplicationSeedData();
      res.json(
        createResponseDto(
          EnumHttpStatusCode.OK_200,
          EnumHttpStatusMessageType.SUCCESS_MESSAGE,
          AppMessages.SUCCESS,
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  async onGetLanguage(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.languageSeedService.getLanguageSeedData();
      res.json(
        createResponseDto(
          EnumHttpStatusCode.OK_200,
          EnumHttpStatusMessageType.SUCCESS_MESSAGE,
          AppMessages.SUCCESS,
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }
  async onGetApplicationCodeAndName(req: Request, res: Response, next: NextFunction) {
    try {
      const applicationCodeAndName = defaultApplication.map((app) => ({
        name: app.display_name,
        code: app.code,
      }));

      return res
        .status(EnumHttpStatusCode.OK_200)
        .json(
          createResponseDto(
            EnumHttpStatusCode.OK_200,
            EnumHttpStatusMessageType.SUCCESS_MESSAGE,
            AppMessages.APPLICATION_DATA_FETCHED_SUCCESSFULLY,
            applicationCodeAndName
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async onGetCountryCodeAndName(req: Request, res: Response, next: NextFunction) {
    try {
      const countryCodeAndName = defaultCountries.map((country) => ({
        name: country.name,
        code: country.country_code,
      }));
      return res
        .status(EnumHttpStatusCode.OK_200)
        .json(
          createResponseDto(
            EnumHttpStatusCode.OK_200,
            EnumHttpStatusMessageType.SUCCESS_MESSAGE,
            AppMessages.LANGUAGE_DATA_FETCHED_SUCCESSFULLY,
            countryCodeAndName
          )
        );
    } catch (error) {}
  }

  async onGetLanguageCodeAndName(req: Request, res: Response, next: NextFunction) {
    try {
      const languages = defaultLanguages.map((language) => ({
        name: language.display_name,
        code: language.code,
      }));

      return res
        .status(EnumHttpStatusCode.OK_200)
        .json(
          createResponseDto(
            EnumHttpStatusCode.OK_200,
            EnumHttpStatusMessageType.SUCCESS_MESSAGE,
            AppMessages.LANGUAGE_DATA_FETCHED_SUCCESSFULLY,
            languages
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async onGetCountry(req: Request, res: Response, next: NextFunction) {
    const countrycode = req.params.countrycode.toUpperCase();
    try {
      const countryData = defaultCountries.find((country) => country.country_code === countrycode);

      if (countryData) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              EnumHttpStatusMessageType.SUCCESS_MESSAGE,
              AppMessages.SEED_DATA_FETCHED_SUCCESSFULLY,
              countryData
            )
          );
      } else {
        return res
          .status(EnumHttpStatusCode.NOT_FOUND_404)
          .json(
            createResponseDto(
              EnumHttpStatusCode.NOT_FOUND_404,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              `Country with code ${countrycode} not found`,
              null
            )
          );
      }
    } catch (error) {
      next(error);
    }
  }
}
