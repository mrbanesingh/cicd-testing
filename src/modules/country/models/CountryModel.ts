import mongoose, { Document, Model, Schema } from "mongoose";
import { ICountryModel } from "./ICountryModel";
import { IDENTIFIERS_COLLECTION_NAMES } from "../../../common/constants/IdentifierCollectionName";
import MongooseDefaultHook from "../../../common/utils/MongooseDefaultHooks";
import { EnumApplication } from "../../../common/enums/Application";
import { EnumLanguage } from "../../../common/enums/Languages";

const isValidEnumValue = <T extends string>(enumObject: { [key: string]: T }, value: string): value is T => {
  return Object.values(enumObject).includes(value as T);
};
const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

function hasDuplicates(array: string[]): boolean {
  return new Set(array).size !== array.length;
}

export const CountrySchema: Schema<ICountryModel> = new Schema({
  country_code: {
    type: String,
    required: [true, "Country code is required"],
    maxlength: [3, "Country code cannot be more than 3 characters long"],
    minlength: [3, "Country code cannot be less than 3 characters long"],
    trim: true,
  },
  mobile_number_prefix: {
    type: String,
    required: [true, "Mobile number prefix is required"],
    maxlength: [5, "Mobile number prefix cannot be more than 5 characters long"],
    trim: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [50, "Name cannot be more than 50 characters long"],
    trim: true,
  },
  display_name: {
    type: String,
    required: [true, "Display name is required"],
    maxlength: [50, "Display name cannot be more than 50 characters long"],
    trim: true,
  },
  local_currency_symbol: {
    type: String,
    required: [true, "Local currency symbol is required"],
    maxlength: [5, "Local currency symbol cannot be more than 5 characters long"],
    trim: true,
  },
  local_currency_name: {
    type: String,
    required: [true, "Local currency name is required"],
    maxlength: [50, "Local currency name cannot be more than 50 characters long"],
    trim: true,
  },

  flag_base_url: {
    type: String,
    maxlength: [1000, "Flag base URL cannot be more than 1000 characters long"],
    trim: true,
  },
  flag_location_url: {
    type: String,
    maxlength: [1000, "Flag location URL cannot be more than 1000 characters long"],
    trim: true,
  },
  flag_url: {
    type: String,
    required: [true, "Flag Url is required"],
    maxlength: [1000, "Flag url is required"],
    trim: true,
    validate: [
      {
        validator: function (value) {
          return urlRegex.test(value);
        },
        message: "Flag URL format is invalid",
      },
    ],
  },
  mobile_number_length_min: {
    type: Number,
    required: [true, "Mobile number min length  is required"],
    trim: true,
    min: [7, "Mobile number min length must be at least 7"],
    max: [15, "Mobile number min length cannot be greater than 15"],
  },
  mobile_number_length_max: {
    type: Number,
    min: [7, "Mobile number max length must be at least 7 digits"],
    max: [15, "Mobile number max length cannot be greater than 15 digits"],
    required: [true, "Mobile number length max is required"],
  },
  number_of_kids_limit: {
    type: Number,
    required: [true, "Number of kids limit is required"],
    trim: true,
    min: [1, "Atleast one kid required"],
    max: [100, "Number of kids limit cannot be greater than 100"],
    default: 1,
  },
  number_of_spouse_limit: {
    type: Number,
    required: [true, "Number of spouse limit is required"],
    min: [2, "Minimum spouse limit is 2"],
    max: [100, "Maximum spouse limit is 100"],
    default: 2,
  },
  terms_and_conditions: {
    type: String,
    maxlength: [500, "Terms and conditions cannot be more than 500 characters long"],
    required: [true, "Terms and Conditions are required"],
    trim: true,
    validate: {
      validator: function (value) {
        return urlRegex.test(value);
      },
      message: "Terms and conditions URL format is invalid",
    },
  },
  privacy_policy: {
    type: String,
    maxlength: [500, "Privacy policy cannot be more than 500 characters long"],
    required: true,
    trim: true,
    validate: {
      validator: function (value) {
        return urlRegex.test(value);
      },
      message: "Privacy policy URL format is invalid",
    },
  },
  otp_expire_time: {
    type: Number,
    required: [true, "OTP expire time is required"],
    min: [60, "Minimum OTP expire time is 60 seconds"],
    max: [6000, "Maximum OTP expire time is 90 seconds"],
  },
  otp_resend_time: {
    type: Number,
    required: [true, "OTP resend time is required"],
    min: [60, "Minimum OTP resend time is 60 seconds"],
    max: [6000, "Maximum OTP resend time is 6000 seconds"],
  },
  otp_attempt_limit: {
    type: Number,
    required: [true, "OTP attempt limit is required"],
    min: [1, "Minimum OTP attempt limit is 1"],
    max: [100, "Maximum OTP attempt limit is 100"],
  },
  otp_cooldown_limit: {
    type: Number,
    required: [true, "OTP cooldown limit is required"],
    min: [1, "Minimum OTP cooldown limit is 60 seconds"],
    max: [6000, "Maximum OTP cooldown limit is 6000 seconds"],
  },
  is_kid_dob_editable: {
    type: Boolean,
    required: [true, "Is kid DOB editable is required"],
    default: true,
  },
  languages: {
    type: [String],
    required: true,
    validate: [
      {
        validator: function (value: string[]) {
          return value.every((lang) => isValidEnumValue(EnumLanguage, lang));
        },
        message: "Invalid language code",
      },
      {
        validator: function (value: any) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "please provide valid languages",
      },
      {
        validator: function (value) {
          return !hasDuplicates(value);
        },
        message: "Duplicate languages",
      },
    ],
  },
  applications: {
    type: [String],
    required: true,
    validate: [
      {
        validator: function (value: string[]) {
          return value.every((app) => isValidEnumValue(EnumApplication, app));
        },
        message: "Invalid application code",
      },
      {
        validator: function (value: any) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "Please provide valid applications",
      },
      {
        validator: function (value: string[]) {
          return !hasDuplicates(value);
        },
        message: "Duplicate applications",
      },
    ],
  },

  is_active: {
    type: Boolean,
    default: true,
  },
  is_deleted: { type: Boolean, default: false },
  created_by: {
    type: String,
    maxlength: 100,
    default: "kailash.gehlot@zevo360.com",
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: String,
    maxlength: 100,
    default: "kailash.gehlot@zevo360.com",
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

CountrySchema.pre("validate", function (next) {
  if (this.mobile_number_length_min > this.mobile_number_length_max) {
    this.invalidate(
      "mobile_number_length_min",
      "Minimum length of mobile number cannot be greater than maximum length."
    );
  }
  next();
});
MongooseDefaultHook.setupDefaultHooks(CountrySchema);

export const CountryModel = mongoose.model(IDENTIFIERS_COLLECTION_NAMES.COUNTRY_MASTER, CountrySchema);
