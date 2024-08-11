import mongoose from "mongoose";

export interface IDatabaseProvider {
  getConnection(): mongoose.Connection;
}
