// src/providers/MongoDBProvider.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import { injectable } from "inversify";
import appSetting from "../../config";
import { IDatabaseProvider } from "./IDatabaseProvider";

dotenv.config();

@injectable()
export class MongoDBProvider implements IDatabaseProvider {
  private static _instance: MongoDBProvider;
  private connection!: mongoose.Connection;

  constructor() {
    // Prevent direct instantiation
    if (MongoDBProvider._instance) {
      throw new Error(
        "Use MongoDBProvider.getInstance() to get the singleton instance."
      );
    }

    const mongoDbUrl: string | undefined = appSetting.MONGODB_URI;
    mongoose.connect(mongoDbUrl!, {});
    this.connection = mongoose.connection;

    this.connection.once("open", () => {
      console.log("MongoDB connected");
    });

    this.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    MongoDBProvider._instance = this;
  }

  public static getInstance(): MongoDBProvider {
    if (!MongoDBProvider._instance) {
      MongoDBProvider._instance = new MongoDBProvider();
    }
    return MongoDBProvider._instance;
  }

  public getConnection(): mongoose.Connection {
    return this.connection;
  }
}

export default MongoDBProvider;
