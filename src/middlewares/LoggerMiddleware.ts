import { Request, Response, NextFunction } from "express";
import { EnumHttpStatusCode } from "../common/enums/HttpStatusCode";
import { createResponseDto } from "../dto/ResponseDTO";
import { EnumHttpStatusMessageType } from "../common/enums/HttpStatusMessageType";
import { AppMessages } from "../common/constants/AppMessages";
import logger from "./Logger";

const loggerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log("Error From Middleware - ", err);

  logger.error(err.stack);
  //logger.error({ error: err, custom: true });
  return res
    .status(EnumHttpStatusCode.OK_200)
    .json(
      createResponseDto(
        EnumHttpStatusCode.INTERNAL_SERVER_500,
        EnumHttpStatusMessageType.ERROR_MESSAGE,
        AppMessages.INTERNAL_SERVER_ERROR_500_MESSAGE,
        null
      )
    );
};

export default loggerMiddleware;
