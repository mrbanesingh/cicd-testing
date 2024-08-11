import { Request, Response, NextFunction } from "express";
import { EnumHttpStatusCode } from "../common/enums/HttpStatusCode";
import { EnumHttpStatusMessageType } from "../common/enums/HttpStatusMessageType";
import { createResponseDto } from "../dto/ResponseDTO";
import { AppMessages } from "../common/constants/AppMessages";

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res
    .status(EnumHttpStatusCode.OK_200)
    .json(
      createResponseDto(
        EnumHttpStatusCode.NOT_FOUND_404,
        EnumHttpStatusMessageType.ERROR_MESSAGE,
        AppMessages.NOT_FOUND_404_MESSAGE,
        null
      )
    );
};
