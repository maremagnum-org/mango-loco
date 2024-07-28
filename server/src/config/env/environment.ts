import "dotenv/config";
import { ServerConfig } from "../../common/interfaces/env-interface";

export const config: ServerConfig = {
  server: {
    host: process.env.HOST || "localhost",
    port: Number(process.env.PORT || 3000),
    nodeEnv: process.env.NODE_ENV || "development",
    corsPolicy: process.env.CORS_POLICY || "*",
  },

  database: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
  },

  encryptation: {
    jwtSecret: process.env.JWT_SECRET || "jwtSecret",
  },
};
