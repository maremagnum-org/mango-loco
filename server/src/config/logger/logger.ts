import { Service } from "typedi";
import {
  createLogger,
  format,
  Logger as WistonLogger,
  LoggerOptions,
  transports,
} from "winston";

const { combine, timestamp, printf, colorize, json, splat } = format;

const consoleFormat = printf(
  ({ level, message, timestamp, filename, line }) => {
    return `🥭 : ${timestamp}\ : ${level}\ : ${message}\n`;
  }
);

@Service("logger")
export class Logger {
  private logger: WistonLogger;

  constructor() {
    this.logger = createLogger({
      level: "info",
      format: combine(
        colorize({
          all: true,
          colors: {
            info: "green",
            warn: "yellow",
            error: "red",
            debug: "blue",
          },
        }),
        timestamp({
          format: "YYYY-MM-DD HH:mm",
        }),
        splat(),
        json()
      ),
      defaultMeta: { service: "logger" },
      transports: [
        new transports.Console({
          format: combine(consoleFormat),
        }),
      ],
      exceptionHandlers: [
        new transports.Console({
          format: combine(consoleFormat),
        }),
      ],
      rejectionHandlers: [
        new transports.Console({
          format: combine(consoleFormat),
        }),
      ],
    });
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public info(message: string, filename?: string, line?: number): void {
    this.logger.info(message, { filename, line });
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
}
