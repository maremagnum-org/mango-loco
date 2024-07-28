import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { config } from "./config/env/environment";
import { PaginationInterceptor } from "./common/pagination/interceptors/pagination-interceptor";
import {
  DataSourceManager,
  RepositoryManager,
} from "./config/database/data-source";
import { Logger } from "./config/logger/logger";

async function boostrap(): //  Promise<express.Application>
Promise<express.Express> {
  const app = express();
  const logger = new Logger();
  // Configurar TypeDI para routing-controllers
  useContainer(Container);

  const PORT = config.server.port;
  const HOST = config.server.host;

  const controllersPath = path.join(__dirname + "/api/controllers/*{.ts,.js}");
  const middlewaresPath = path.join(__dirname + "/middlewares/*{.ts,.js}");
  // const interceptorsPath = path.join(__dirname + "/api/interceptors/*{.ts,.js}");

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(helmet());

  async function init() {
    // Initialize the data source
    await Container.get(DataSourceManager).initialize();
    // Register the repositories
    await Container.get(RepositoryManager).registerRepositories();
  }

  useExpressServer(app, {
    routePrefix: "/api",
    controllers: [controllersPath],
    middlewares: [middlewaresPath],
    // interceptors: [interceptorsPath],
    interceptors: [PaginationInterceptor],
    validation: true,
    cors: true,
    classTransformer: false,
    classToPlainTransformOptions: {
      excludeExtraneousValues: true,
      exposeUnsetFields: true,
      
    },
    // defaultErrorHandler: false,
  }).listen(PORT, async () => {
    await init();
    logger.info(`El servidor se está ejecutando en ${HOST}:${PORT}`);
  });

  return app;
}
boostrap();
