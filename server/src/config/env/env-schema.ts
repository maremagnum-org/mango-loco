import Joi from "joi";
import { config } from "./environment";

(async () => {
  const configSchema = Joi.object({
    server: Joi.object({
      host: Joi.string().required(),
      port: Joi.number().required(),
      nodeEnv: Joi.string().required(),
    }).required(),

    database: Joi.object({
      host: Joi.string().required(),
      user: Joi.string().required(),
      password: Joi.string().required(),
      database: Joi.string().required(),
    }).required(),

    encryptation: Joi.object({
      jwtSecret: Joi.string().required(),
    }).required(),
  }).unknown(true);

  try {
    await configSchema.validateAsync(config);
  } catch (error) {
    console.error(
      "# # La configuración no cumple con el esquema requerido # # : ",
      error.details
    );
    process.exit(1);
  }
})();
