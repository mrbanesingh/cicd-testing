import mongoose, { Document, Schema } from "mongoose";
export interface IUser {
  email: string;
  userId: number;
  role: string | null;
  is_active: boolean;
  is_deleted: boolean;
  created_by: string;
  created_date: Date;
  updated_by: string;
  updated_date: Date;
}
