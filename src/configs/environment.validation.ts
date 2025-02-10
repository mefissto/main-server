import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .trim() // Remove whitespace from the string as the value sometimes comes with whitespace
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  APP_PORT: Joi.number().default(3000),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(false),
  DATABASE_AUTOLOAD_ENTITIES: Joi.boolean().default(false),
  JWT_SECRET: Joi.string().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  JWT_ACCESS_TOKEN_TTL: Joi.number().default(3600),
});
