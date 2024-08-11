import mongoose, { Model, Schema } from "mongoose";
import { IApplicationSeedModel } from "./IApplicationSeedModel";
import { IDENTIFIERS_COLLECTION_NAMES } from "../../../common/constants/IdentifierCollectionName";
import { EnumApplication } from "../../../common/enums/Application";

export const ApplicationSeedSchema: Schema<IApplicationSeedModel> = new Schema({
  code: {
    type: String,
    required: [true, "Application code is required"],
    maxlength: 50,
    trim: true,
    unique: true,
    default: EnumApplication.ZEVO360,
    enum: Object.values(EnumApplication),
  },
  display_name: {
    type: String,
    required: [true, "Application name is required"],
    maxlength: 50,
    trim: true,
    unique: true,
    default: EnumApplication.ZEVO360,
    enum: Object.values(EnumApplication),
  },
});

// Create the Application Seed Data model
const ApplicationSeedModel: Model<IApplicationSeedModel> = mongoose.model(
  IDENTIFIERS_COLLECTION_NAMES.APPLICATION_SEED_DATA,
  ApplicationSeedSchema
);

export default ApplicationSeedModel;
