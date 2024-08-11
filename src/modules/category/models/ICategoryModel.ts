import { Document } from "mongoose";
export interface ICategoryModel extends Document {
  name: string;
  category_code: string;
  count?: number;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string;
  created_date: Date;
  updated_by: string;
  updated_date: Date;
}
