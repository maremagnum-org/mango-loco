export interface ServerConfig {
  server: {
    host: string;
    port: number;
    nodeEnv: string;
    corsPolicy: string;
  };
  database: {
    port: number;
    host: string;
    user: string;
    password: string;
    database: string;
  };
  encryptation: {
    jwtSecret: string;
  };
}
