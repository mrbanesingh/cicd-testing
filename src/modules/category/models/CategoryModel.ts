import mongoose, { Schema } from "mongoose";
import { ICategoryModel } from "./ICategoryModel";
import MongooseDefaultHook from "../../../common/utils/MongooseDefaultHooks";
import { IDENTIFIERS_COLLECTION_NAMES } from "../../../common/constants/IdentifierCollectionName";
import { generateUniqueCode } from "../../../common/utils/GenerateUniqueCode";

export const CategorySchema: Schema<ICategoryModel> = new Schema({
  category_code: {
    type: String,
    unique: true,
    default: generateUniqueCode,
  },
  name: {
    type: String,
    maxlength: [50, "Category name cannot be more than 50 characters long"],
    minlength: [1, "Category name cannot be less than 1 character long"],
    required: [true, "Name is required"],
    trim: true,
    validate: {
      validator: function (value: string): boolean {
        return /^[\w\s!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(value);
      },
      message: "Invalid input: Only alphanumeric characters, spaces, and special characters are allowed.",
    },
  },
  is_active: {
    type: Boolean,
    required: [true, "Status is required"],
    validate: {
      validator: function (value: boolean): boolean {
        return typeof value === "boolean";
      },
      message: "is_active must be a boolean value.",
    },
  },
  is_deleted: { type: Boolean, default: false },
  created_by: {
    type: String,
    maxlength: 100,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_by: {
    type: String,
    maxlength: 100,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

MongooseDefaultHook.setupDefaultHooks(CategorySchema);
CategorySchema.index(
  { name: 1 },
  {
    unique: true,
    partialFilterExpression: {
      is_deleted: false,
    },
  }
);

CategorySchema.pre("save", async function (next) {
  const doc = this as ICategoryModel;

  if (doc.isNew) {
    let uniqueCodeGenerated = false;
    while (!uniqueCodeGenerated) {
      const existingDoc = await mongoose
        .model(IDENTIFIERS_COLLECTION_NAMES.CATEGORY_MASTER)
        .findOne({ category_code: doc.category_code });

      if (!existingDoc) {
        uniqueCodeGenerated = true;
      } else {
        doc.category_code = generateUniqueCode();
      }
    }
  }

  next();
});
export const CategoryModel = mongoose.model(IDENTIFIERS_COLLECTION_NAMES.CATEGORY_MASTER, CategorySchema);
