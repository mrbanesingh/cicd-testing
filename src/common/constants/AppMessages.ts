export class AppMessages {
  static readonly ERROR: string = "error";
  static readonly SUCCESS: string = "success";
  static readonly NOT_FOUND_404_MESSAGE: string = "The requested resource was not found on this server. ";
  static readonly INTERNAL_SERVER_ERROR_500_MESSAGE: string = "An unexpected error occurred. Please try again later.";
  static readonly NO_RECORD_FOUND = "No record(s) found";
  static readonly FAILED_TO_PERFORM_OPERATION = "Failed to perform operation";
  static readonly ALLFIELD_REQUIRED_MESSAGE = "All fields are required.";

  //COUNTRY
  static readonly COUNTRY_CREATED_SUCCESS_MESSAGE = "Country created successfully.";
  static readonly COUNTRY_UPDATED_SUCCESS_MESSAGE = "Country updated successfully.";
  static readonly COUNTRY_DELETED_SUCCESS_MESSAGE = "Country deleted successfully.";
  static readonly COUNTRY_FETCHED_SUCCESS_MESSAGE = "Country fetched successfully.";
  static readonly COUNTRY_ALREADY_EXISTS_MESSAGE = "Country already exists.";
  static readonly COUNTRY_NOT_FOUND_MESSAGE = "Country not found.";
  static readonly AMAZON_DOT_COM_SLASH = "https://zevo360-file-storage.s3.amazonaws.com/";
  static readonly DATA_DOES_NOT_MATCH_WITH_SEED_DATA = "Data does not match with seed data";

  //LANGUAGE
  static readonly APPLICATION_DATA_FETCHED_SUCCESSFULLY = "Application data fetched successfully";

  //APPLICATION
  static readonly LANGUAGE_DATA_FETCHED_SUCCESSFULLY = "Language data fetched successfully";

  //SEED DATA
  static readonly SEED_DATA_FETCHED_SUCCESSFULLY = "Seed data fetched successfully";

  //OTHER ERROR MESSAGES
  static readonly ERROR_USER_NOT_FOUND = "User not found.";
  static readonly ERROR_INVALID_INPUT = "Invalid input provided.";
  static readonly ERROR_DATABASE_CONNECTION = "Error connecting to the database.";

  //RATE LIMITOR MESSAGES
  static readonly RATE_LIMIT_MESSAGE = "You have exceeded your 5 requests per minute limit.";

  //CATEGORY
  static readonly CATEGORY_CREATED_SUCCESSFULLY = "Category created successfully";
  static readonly CATEGORY_UPDATED_SUCCESSFULLY = "Category updated successfully";
  static readonly CATEGORY_FETCHED_SUCCESSFULLY = "Category fetched successfully";
  static readonly CATEGORY_NOT_FOUND_MESSAGE = "Category not found";
  static readonly CATEGORY_DELETED_SUCCESS_MESSAGE = "Category deleted successfully";
  static readonly INVALID_CATEGORY_CODE = "Invalid category code";
  static readonly PAGE_AND_LIMIT_MUST_BE_POSITIVE_NUMBERS_GREATER_THAN_ZERO =
    "Page and limit must be positive numbers greater than zero";
  static readonly DUPLICATE_CATEGORY_NAME = "Duplicate category name";

  //JWT TOKEN
  static readonly PLEASE_PROVIDE_THE_BEARER_TOKEN = "Please provide the bearer token";
  static readonly UNAUTHORIZED_REQUEST = "Unauthorized request";
}
