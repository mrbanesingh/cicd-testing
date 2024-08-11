import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { AppMessages } from "../common/constants/AppMessages";
import { createResponseDto } from "../dto/ResponseDTO";
import { EnumHttpStatusCode } from "../common/enums/HttpStatusCode";
import { EnumHttpStatusMessageType } from "../common/enums/HttpStatusMessageType";
import appSetting from "../config";
// Define rate limiter options
const rateLimitOptions = {
  windowMs: appSetting.RATELIMIT_TIME, // 1 minute
  max: appSetting.RATELIMIT_MAXREQUEST, // Limit each IP to no of requests per windowMs
  //Headers: true,
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req: Request, res: Response, next: NextFunction) {
    return res
      .status(EnumHttpStatusCode.RATE_LIMITER_429)
      .json(
        createResponseDto(
          EnumHttpStatusCode.RATE_LIMITER_429,
          EnumHttpStatusMessageType.ERROR_MESSAGE,
          AppMessages.RATE_LIMIT_MESSAGE,
          null
        )
      );
  },
};

// Create rate limiter middleware
const rateLimiterMiddleware = null; //rateLimit(rateLimitOptions);

export { rateLimiterMiddleware };

// export default rateLimiterMiddleware;
