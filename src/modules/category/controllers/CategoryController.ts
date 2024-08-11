import { inject, injectable } from "inversify";
import { IDENTIFIER } from "../../../common/constants/identifiers";
import { ICategoryService } from "../services/ICategoryService";
import { NextFunction, Request, Response } from "express";
import { CategoryModel } from "../models/CategoryModel";
import { EnumHttpStatusCode } from "../../../common/enums/HttpStatusCode";
import { createResponseDto } from "../../../dto/ResponseDTO";
import { EnumHttpStatusMessageType } from "../../../common/enums/HttpStatusMessageType";
import { AppMessages } from "../../../common/constants/AppMessages";
import { handleValidationError } from "../../../common/errors/ValidationError";
import { ICategoryModel } from "../models/ICategoryModel";

@injectable()
export class CategoryController {
  private service: ICategoryService;

  constructor(@inject(IDENTIFIER.ICategoryService) service: ICategoryService) {
    this.service = service;
  }

  async onCreateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const newCategory = new CategoryModel({
        ...body,
        created_by: req.body.user.email,
        created_date: new Date(),
        updated_by: req.body.user.email,
        updated_date: new Date(),
      });
      await newCategory.validate();
      newCategory.name = newCategory.name.toUpperCase();
      const category: ICategoryModel = await this.service.createCategory(newCategory);

      return res
        .status(EnumHttpStatusCode.CREATED_201)
        .json(
          createResponseDto(
            EnumHttpStatusCode.CREATED_201,
            EnumHttpStatusMessageType.SUCCESS_MESSAGE,
            AppMessages.CATEGORY_CREATED_SUCCESSFULLY,
            category
          )
        );
    } catch (error: any) {
      //clear doubt
      next(error);
      return handleValidationError(error, res);
    }
  }

  async onGetCategoryByCode(req: Request, res: Response, next: NextFunction) {
    try {
      const categoryCode = req.params.categorycode;
      const result: ICategoryModel | null = await this.service.checkCategoryByCode(categoryCode);
      if (result == null) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(createResponseDto(EnumHttpStatusCode.OK_200, AppMessages.SUCCESS, AppMessages.NO_RECORD_FOUND, result));
      } else {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              AppMessages.SUCCESS,
              AppMessages.CATEGORY_FETCHED_SUCCESSFULLY,
              result
            )
          );
      }
    } catch (error) {
      next(error);
      return handleValidationError(error, res);
    }
  }

  async onDeleteCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const category_code = req.params.categorycode;
      const existingCategory = await this.service.checkCategoryByCode(category_code);
      if (existingCategory == null) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.NOT_FOUND_404,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.CATEGORY_NOT_FOUND_MESSAGE + ` with category code - ${category_code}`,
              existingCategory
            )
          );
      }

      const updateData = {
        is_deleted: true,
        updated_by: req.body.user.email,
        updated_date: new Date(),
      };

      const softDeletedCategory = await this.service.deleteCategory(category_code, updateData);

      if (!softDeletedCategory) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.VALIDATION_ERROR_422,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.CATEGORY_NOT_FOUND_MESSAGE + ` with category code ${category_code}`,
              softDeletedCategory
            )
          );
      }

      return res
        .status(EnumHttpStatusCode.OK_200)
        .json(
          createResponseDto(
            EnumHttpStatusCode.DELETED_204,
            EnumHttpStatusMessageType.SUCCESS_MESSAGE,
            AppMessages.CATEGORY_DELETED_SUCCESS_MESSAGE + ` with category code ${category_code}`,
            softDeletedCategory
          )
        );
    } catch (error: any) {
      next(error);
      return handleValidationError(error, res);
    }
  }

  async onUpdateCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const categoryCode = req.params.categorycode;
      const newCategory = new CategoryModel({
        ...body,
        created_date: new Date(),
        updated_by: req.body.user.email,
        updated_date: new Date(),
      });
      await newCategory.validate();
      newCategory.name = newCategory.name.toUpperCase();
      const result: ICategoryModel | null = await this.service.checkCategoryByCode(categoryCode);
      if (result == null) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              EnumHttpStatusMessageType.ERROR_MESSAGE,
              AppMessages.INVALID_CATEGORY_CODE,
              null
            )
          );
      }
      let category: ICategoryModel | null = await this.service.updateCategory(categoryCode, newCategory);
      if (category != null) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              EnumHttpStatusMessageType.SUCCESS_MESSAGE,
              AppMessages.CATEGORY_UPDATED_SUCCESSFULLY,
              category
            )
          );
      }
    } catch (error) {
      next(error);
      return handleValidationError(error, res);
    }
  }

  async onGetCategory(req: Request, res: Response, next: NextFunction) {
    try {
      let page = parseInt(req.query.page as string);
      let limit = parseInt(req.query.limit as string);
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
      if (search !== "") {
        search = search.toUpperCase();
      }
      const media: ICategoryModel[] = await this.service.getCategory(offset, limit, search);
      if (media.length == 0) {
        return res
          .status(EnumHttpStatusCode.OK_200)
          .json(
            createResponseDto(
              EnumHttpStatusCode.OK_200,
              EnumHttpStatusMessageType.SUCCESS_MESSAGE,
              AppMessages.NO_RECORD_FOUND,
              media
            )
          );
      }
      return res
        .status(EnumHttpStatusCode.OK_200)
        .json(
          createResponseDto(
            EnumHttpStatusCode.OK_200,
            EnumHttpStatusMessageType.SUCCESS_MESSAGE,
            AppMessages.CATEGORY_FETCHED_SUCCESSFULLY,
            media
          )
        );
    } catch (error) {
      next(error);
      return handleValidationError(error, res);
    }
  }
}
