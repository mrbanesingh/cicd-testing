import mongoose, { Document, Schema, model } from "mongoose";
import { ICountrySeedModel } from "./ICountrySeedModel";
import { IDENTIFIERS_COLLECTION_NAMES } from "../../../common/constants/IdentifierCollectionName";
import { EnumLanguage } from "../../../common/enums/Languages";

export const CountrySeedSchema: Schema<ICountrySeedModel> = new Schema({
  country_code: {
    type: String,
    required: [true, "Country code is required"],
    maxlength: [3, "Country code cannot be longer than 3 characters"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [100, "Name cannot be longer than 100 characters"],
  },
  display_name: {
    type: String,
    required: [true, "Display name is required"],
    maxlength: [100, "Display name cannot be longer than 100 characters"],
  },
  mobile_number_prefix: {
    type: String,
    required: [true, "Mobile number prefix is required"],
    maxlength: [5, "Mobile number prefix cannot be longer than 5 characters"],
  },
  local_currency_symbol: {
    type: String,
    required: [true, "Local currency symbol is required"],
    maxlength: [5, "Local currency symbol cannot be longer than 5 characters"],
  },
  local_currency_name: {
    type: String,
    required: [true, "Local currency name is required"],
    maxlength: [50, "Local currency name cannot be longer than 50 characters"],
  },
  flag_base_url: {
    type: String,
    required: [true, "Flag base URL is required"],
    maxlength: [1000, "Flag base URL cannot be longer than 1000 characters"],
    validate: {
      validator: function (v: string) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  flag_location_url: {
    type: String,
    required: [true, "Flag location URL is required"],
    maxlength: [1000, "Flag location URL cannot be longer than 1000 characters"],
  },
});

export const CountrySeedModel = model<ICountrySeedModel>(
  IDENTIFIERS_COLLECTION_NAMES.COUNTRY_SEED_DATA,
  CountrySeedSchema
);
