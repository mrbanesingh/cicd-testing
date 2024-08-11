import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

export function checkEnvVariables(): void {
  const examplePath = path.join(__dirname, "../../.env.example");
  const envPath = path.join(__dirname, "../../.env");

  if (!fs.existsSync(examplePath)) {
    throw new Error(".env.example file not found");
  }

  // Load environment variables from .env file
  dotenv.config({ path: envPath });

  // Read .env.example file
  const exampleContent = fs.readFileSync(examplePath, "utf-8");
  const exampleVars = exampleContent
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"));

  // Check if all required variables are set
  for (const line of exampleVars) {
    const [key] = line.split("=");
    if (!process.env[key]) {
      throw new Error(
        `Environment variable ${key} is required but not set. Please set it in the .env file.`
      );
    }
  }
}
