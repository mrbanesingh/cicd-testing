import mongoose, { Model, Schema } from "mongoose";
import { ILanguageSeedModel } from "../models/ILanguageSeedModel";
import { IDENTIFIERS_COLLECTION_NAMES } from "../../../common/constants/IdentifierCollectionName";
import { EnumLanguage } from "../../../common/enums/Languages";

export const LanguageSeedSchema: Schema<ILanguageSeedModel> = new Schema({
  code: {
    type: String,
    required: [true, "Language code is required"],
    maxlength: 50,
    trim: true,
    unique: true,
    default: EnumLanguage.ENGLISH,
    enum: Object.values(EnumLanguage),
  },
  display_name: {
    type: String,
    required: [true, "Language Name is required"],
    maxlength: 50,
    unique: true,
    default: EnumLanguage.ENGLISH,
    enum: Object.values(EnumLanguage),
  },
});
export const LanguageSeedModel = mongoose.model(IDENTIFIERS_COLLECTION_NAMES.LANGUAGE_SEED_DATA, LanguageSeedSchema);
