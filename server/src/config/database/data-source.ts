import { DataSource, DataSourceOptions, Repository } from "typeorm";
import { Container, Inject, Service } from "typedi";
import * as path from "path";
import * as fs from "fs";
import { Logger } from "../logger/logger";
import { config } from "../env/environment";

@Service()
export class DataSourceManager {
  @Inject("logger")
  private logger: Logger;
  private static dataSource: DataSource;

  constructor() {}

  static getDataSourceOptions(): DataSourceOptions {
    return {
      type: "mysql",
      host: config.database.host,
      port: config.database.port,
      username: config.database.user,
      password: config.database.password,
      database: config.database.database,
      entities: [__dirname + "/../../api/models/*.entity{.ts,.js}"],
      logging: true,
      synchronize: true,
      migrationsRun: true,
      dropSchema: true,
    };
  }

  async initialize(): Promise<DataSource> {
    if (!DataSourceManager.dataSource) {
      this.createAndInitializeDataSource();
    }
    return DataSourceManager.dataSource;
  }

  private async createAndInitializeDataSource() {
    const dataSourceOptions = DataSourceManager.getDataSourceOptions();
    DataSourceManager.dataSource = new DataSource(dataSourceOptions);
    await DataSourceManager.dataSource.initialize();
    const entities = DataSourceManager.dataSource.entityMetadatas
      .map((em) => em.name)
      .join(", ");
    this.logger.info("Conexión a la base de datos inicializada");
    this.logger.info(`Entidades cargadas: [ ${entities} ]`);
  }

  async getDataSource(): Promise<DataSource> {
    if (
      !DataSourceManager.dataSource ||
      !DataSourceManager.dataSource.isInitialized
    ) {
      await this.initialize();
    }
    return DataSourceManager.dataSource;
  }
}

@Service()
export class RepositoryManager {
  @Inject("logger")
  private logger: Logger;
  private repositoriesPath = path.join(__dirname, "../../api/repositories");

  constructor() {}

  async registerRepositories() {
    const dataSourceManager = Container.get(DataSourceManager);
    const dataSource = await dataSourceManager.getDataSource();
    const repositoryFiles = this.getRepositoryFiles();

    for (const file of repositoryFiles) {
      await this.registerRepository(dataSource, file);
    }
  }

  private getRepositoryFiles(): string[] {
    return fs
      .readdirSync(this.repositoriesPath)
      .filter(
        (file) =>
          file.endsWith(".repository.ts") || file.endsWith(".repository.js")
      );
  }

  private async registerRepository(dataSource: DataSource, file: string) {
    try {
      const repositoryModule = await import(
        path.join(this.repositoriesPath, file)
      );
      const RepositoryClass = Object.values(repositoryModule)[0] as any;

      if (RepositoryClass.prototype instanceof Repository) {
        const instance = new RepositoryClass(dataSource);
        Container.set(RepositoryClass, instance);
        this.logger.info(`Repositorio registrado: ${RepositoryClass.name}`);
      }
    } catch (error) {
      this.logger.error(`Error al registrar el repositorio ${file}: ${error}`);
    }
  }
}

const dataSourceManager = Container.get(DataSourceManager);
export const AppDataSource = dataSourceManager.getDataSource();

Container.set(DataSource, {
  factory: () => dataSourceManager.getDataSource(),
});
