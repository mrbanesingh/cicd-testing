import { NextFunction, Request, Response } from "express";
import { EnumHttpStatusCode } from "../../../common/enums/HttpStatusCode";
import { createResponseDto } from "../../../dto/ResponseDTO";
import { EnumHttpStatusMessageType } from "../../../common/enums/HttpStatusMessageType";
import { AppMessages } from "../../../common/constants/AppMessages";
import { ICountryModel } from "../models/ICountryModel";
import { CountryModel } from "../models/CountryModel";
import { ICountryService } from "../services/ICountryService";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import { handleValidationError } from "../../../common/errors/ValidationError";
import { inject, injectable } from "inversify";
import { FilterParams } from "../models/FilterParams";
import { defaultCountries } from "../services/CountrySeedService";

@injectable()
export class CountryController {
  private service: ICountryService;

  constructor(@inject(IDENTIFIER.ICountryService) service: ICountryService) {
    this.service = service;
  }

  async onCreateCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;

      /**** Merge the body data into the entity ****/
      const newCountryMaster = new CountryModel({
        ...body,
      });
      newCountryMaster.otp_expire_time = newCountryMaster.otp_expire_time * 60;
      newCountryMaster.otp_resend_time = newCountryMaster.otp_resend_time * 60;
      newCountryMaster.otp_cooldown_limit = newCountryMaster.otp_cooldown_limit * 60;
      /***  Validate the new entity schema ***/
      await newCountryMaster.validate();
      const isDefaultCountry = defaultCountries.some(
        (country) =>
          country.country_code === body.country_code.toUpperCase() &&
          country.mobile_number_prefix === body.mobile_number_prefix &&
          country.name === body.name &&
          country.display_name === body.display_name &&
          country.local_currency_symbol === body.local_currency_symbol &&
          country.local_currency_name === body.local_currency_name &&
          country.flag_url === body.flag_url
      );

      if (!isDefaultCountry) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.BAD_REQUEST_400,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.DATA_DOES_NOT_MATCH_WITH_SEED_DATA,
              null
            )
          );
      }

      /***** Check with only country_code ******/
      const existingCountryCode = await this.service.countryExists({
        country_code: newCountryMaster.country_code,
      });
      if (existingCountryCode) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.DUPLICATE_DATA_409,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.COUNTRY_ALREADY_EXISTS_MESSAGE + ` with country code - ${newCountryMaster.country_code}`,
              existingCountryCode
            )
          );
      }
      newCountryMaster.created_by = req.body.user.email;
      newCountryMaster.updated_by = req.body.user.email;
      newCountryMaster.created_date = new Date();
      newCountryMaster.updated_date = new Date();

      const newCountry = await this.service.createCountry(newCountryMaster);

      /*HttpStatusCode 201 is for new resource created*/

      if (newCountry) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.CREATED_201,
              EnumHttpStatusMessageType.SUCCESS_MESSAGE,
              AppMessages.COUNTRY_CREATED_SUCCESS_MESSAGE,
              newCountry
            )
          );
      }
    } catch (error: any) {
      /************ Handling Individual Validation Errors ***********/
      //if (error.name === "ValidationError") {
      // next(error);
      next(error);
      return handleValidationError(error, res);

      //}
    }
  }

  async onUpdateCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const country_code_input = req.params.countryCode;
      const body = req.body;
      const input = new CountryModel({
        ...req.body,
      });
      input.otp_expire_time = input.otp_expire_time * 60;
      input.otp_resend_time = input.otp_resend_time * 60;
      input.otp_cooldown_limit = input.otp_cooldown_limit * 60;
      await input.validate();

      const isDefaultCountry = defaultCountries.some(
        (country) =>
          country.country_code === req.params.countryCode.toUpperCase() &&
          country.country_code === body.country_code.toUpperCase() &&
          country.mobile_number_prefix === body.mobile_number_prefix &&
          country.name === body.name &&
          country.display_name === body.display_name &&
          country.local_currency_symbol === body.local_currency_symbol &&
          country.local_currency_name === body.local_currency_name &&
          country.flag_url === body.flag_url
      );

      if (!isDefaultCountry) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.BAD_REQUEST_400,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.DATA_DOES_NOT_MATCH_WITH_SEED_DATA,
              null
            )
          );
      }
      /***** Check with only country_code ******/
      const existingCountryCode = await this.service.countryExists({
        country_code: input.country_code,
      });

      if (existingCountryCode == null || country_code_input.toLowerCase() === input.country_code?.toLocaleLowerCase()) {
        /** Same or new country is updating**/
      } else {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.DUPLICATE_DATA_409,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.COUNTRY_ALREADY_EXISTS_MESSAGE + ` with country code - ${input.country_code}`,
              existingCountryCode
            )
          );
      }

      /***** Check with only country_name ******/
      const existingCountryName = await this.service.countryExists({
        name: input.name,
      });

      input.updated_by = req.body.user.email;
      input.updated_date = new Date();
      const updatedCountry = await this.service.updateCountry(country_code_input, input);
      if (updatedCountry) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              EnumHttpStatusMessageType.SUCCESS_MESSAGE,
              AppMessages.COUNTRY_UPDATED_SUCCESS_MESSAGE,
              updatedCountry
            )
          );
      } else {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.BAD_REQUEST_400,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.FAILED_TO_PERFORM_OPERATION,
              updatedCountry
            )
          );
      }
    } catch (error: any) {
      next(error);
      return handleValidationError(error, res);
    }
  }

  async onGetCountries(req: Request, res: Response, next: NextFunction) {
    try {
      let page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        return res
          .status(EnumHttpStatusCode.BAD_REQUEST_400)
          .json(
            createResponseDto(
              EnumHttpStatusCode.BAD_REQUEST_400,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.PAGE_AND_LIMIT_MUST_BE_POSITIVE_NUMBERS_GREATER_THAN_ZERO,
              null
            )
          );
      }
      const offset = (page - 1) * limit;
      let search = (req.query.search as string) || "";
      let application = (req.query.application as string) || "";

      const filterParams = new FilterParams(offset, limit, search, application);
      const result = await this.service.getCountry(filterParams);

      if (result.length == 0) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.NOT_FOUND_404,
              AppMessages.SUCCESS,
              AppMessages.NO_RECORD_FOUND,
              result
            )
          );
      } else {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              AppMessages.SUCCESS,
              AppMessages.COUNTRY_FETCHED_SUCCESS_MESSAGE,
              result
            )
          );
      }
    } catch (error: any) {
      next(error);
      return handleValidationError(error, res);
    }
  }

  async onDeleteCountry(req: Request, res: Response, next: NextFunction) {
    try {
      const country_code = req.params.countryCode;
      const existingCountry = await this.service.checkCountryByCode(country_code);

      if (existingCountry == null) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.NOT_FOUND_404,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.COUNTRY_NOT_FOUND_MESSAGE + ` with country code - ${country_code}`,
              existingCountry
            )
          );
      }

      const updateData = {
        is_active: false,
        is_deleted: true,
        updated_by: req.body.user.email,
        updated_date: new Date(),
      };

      const softDeletedCountry = await this.service.deleteCountry(country_code, updateData);

      if (!softDeletedCountry) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.VALIDATION_ERROR_422,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.COUNTRY_NOT_FOUND_MESSAGE + ` with country code ${country_code}`,
              softDeletedCountry
            )
          );
      }

      return res
        .status(EnumHttpStatusCode.OK_200)
        .json(
          createResponseDto(
            EnumHttpStatusCode.DELETED_204,
            EnumHttpStatusMessageType.SUCCESS_MESSAGE,
            AppMessages.COUNTRY_DELETED_SUCCESS_MESSAGE + ` with country code ${country_code}`,
            softDeletedCountry
          )
        );
    } catch (error: any) {
      next(error);
      return handleValidationError(error, res);
    }
  }

  async onGetCountryByCode(req: Request, res: Response, next: NextFunction) {
    try {
      const countryCode = req.params.code;
      const country: ICountryModel[] | null = await this.service.checkCountryByCode(countryCode);
      if (country) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              EnumHttpStatusMessageType.SUCCESS_MESSAGE,
              AppMessages.COUNTRY_FETCHED_SUCCESS_MESSAGE,
              country[0]
            )
          );
      } else {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.NOT_FOUND_404,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.COUNTRY_NOT_FOUND_MESSAGE + ` with country code - ${countryCode}`,
              null
            )
          );
      }
    } catch (error) {
      next(error);
      return handleValidationError(error, res);
    }
  }
}
