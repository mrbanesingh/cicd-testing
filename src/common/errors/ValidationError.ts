import { Response } from "express";
import { createResponseDto } from "../../dto/ResponseDTO";
import { EnumHttpStatusCode } from "../enums/HttpStatusCode";
import { EnumHttpStatusMessageType } from "../enums/HttpStatusMessageType";

import { AppMessages } from "../constants/AppMessages";
import { MongooseError } from "mongoose";

/**
 * Handles validation errors and sends a formatted response.
 * @param error - The error object containing validation errors.
 * @param res - The Express Response object.
 */
export function handleValidationError(error: any, res: Response) {
  let hasEntered = false;
  // if (error.name === "ValidationError") {
  //   const validationErrors: Record<string, string> = {};
  //   let validationErrorMessage = "";

  //   // Iterate over each validation error and append to the error message string
  //   Object.keys(error.errors[0]).forEach((key) => {
  //     hasEntered = true;
  //     const errorMessage = error.errors[key].message.replace(/^Path `.*`/, "").trim();
  //     validationErrorMessage += `${errorMessage} `;
  //   });

  //   return res
  //     .status(EnumHttpStatusCode.OK_200)
  //     .json(
  //       createResponseDto(
  //         EnumHttpStatusCode.VALIDATION_ERROR_422,
  //         EnumHttpStatusMessageType.ERROR_MESSAGE,
  //         "Validation failed - " + AppMessages.ALLFIELD_REQUIRED_MESSAGE,
  //         validationErrorMessage
  //       )
  //     );
  // }

  if (error.name === "ValidationError") {
    const firstKey = Object.keys(error.errors)[0];
    const firstErrorMessage = error.errors[firstKey].message.replace(/^Path `.*`/, "").trim();

    return res
      .status(EnumHttpStatusCode.OK_200)
      .json(
        createResponseDto(
          EnumHttpStatusCode.VALIDATION_ERROR_422,
          EnumHttpStatusMessageType.ERROR_MESSAGE,
          "Validation failed ",
          firstErrorMessage
        )
      );
  }

  if (error.message.includes("E11000")) {
    return res
      .status(EnumHttpStatusCode.OK_200)
      .json(
        createResponseDto(
          EnumHttpStatusCode.DUPLICATE_DATA_409,
          EnumHttpStatusMessageType.ERROR_MESSAGE,
          AppMessages.DUPLICATE_CATEGORY_NAME,
          null
        )
      );
  }

  // Handle other types of errors here if needed
  return res
    .status(EnumHttpStatusCode.OK_200)
    .json(
      createResponseDto(
        EnumHttpStatusCode.INTERNAL_SERVER_500,
        EnumHttpStatusMessageType.ERROR_MESSAGE,
        "An unexpected error occurred",
        null
      )
    );
}

// import { CustomError } from "../utils/CustomError";

// export class ValidationError extends CustomError {
//   statusCode = 400;
//   statusType = "VALIDATION_ERROR";
//   constructor(message: string, private property: string) {
//     super(message);
//     Object.setPrototypeOf(this, ValidationError.prototype);
//   }
//   serializeErrors() {
//     return [{ message: this.message, property: this.property }];
//   }
// }
