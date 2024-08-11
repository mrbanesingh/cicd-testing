import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { EnumHttpStatusCode } from "../common/enums/HttpStatusCode";
import { createResponseDto } from "../dto/ResponseDTO";
import { AppMessages } from "../common/constants/AppMessages";

import dotenv from "dotenv";
import { IUser } from "../service-consumers/auth/models/IUser";
dotenv.config();
export const JwtValidator = (req: Request, res: Response, next: NextFunction) => {
  const publicKey = process.env.PUBLIC_KEY;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(EnumHttpStatusCode.UNAUTHENTICATE_401)
      .json(
        createResponseDto(
          EnumHttpStatusCode.UNAUTHENTICATE_401,
          AppMessages.ERROR,
          AppMessages.PLEASE_PROVIDE_THE_BEARER_TOKEN,
          null
        )
      );
  }

  const token = authHeader.split(" ")[1];

  if (!publicKey) {
    throw new Error("Key is not present");
  }
  let returnValue: boolean | IUser = false;
  jwt.verify(token, publicKey, { algorithms: ["RS256"] }, (err, payload) => {
    if (err) {
      returnValue = false;
    }
    returnValue = payload as IUser;
  });

  if (!returnValue) {
    return res
      .status(EnumHttpStatusCode.OK_200)
      .json(
        createResponseDto(
          EnumHttpStatusCode.UNAUTHENTICATE_401,
          AppMessages.ERROR,
          AppMessages.UNAUTHORIZED_REQUEST,
          null
        )
      );
  }

  req.body.user = returnValue as IUser;
  next();
};
