
/**
 * The application configuration namespace.
 */
export namespace AppConfig {
  /** The name of the application configuration. */
  export const NAME = 'appConfig';

  /** The environment variable for the application environment. */
  export const ENVIRONMENT = 'environment';
}

/**
 * The database configuration namespace.
 */
export namespace DatabaseConfig {
  /** The name of the database configuration. */
  export const NAME = 'database';

  /** The environment variable for the database auto-load entities. */
  export const AUTOLOAD_ENTITIES = 'autoLoadEntities';

  /** The environment variable for the database synchronize. */
  export const SYNCHRONIZE = 'synchronize';

  /** The environment variable for the database logging. */
  export const LOGGING = 'logging';

  /** The environment variable for the database host. */
  export const DATABASE_HOST = 'host';

  /** The environment variable for the database name. */
  export const DATABASE_NAME = 'name';

  /** The environment variable for the database port. */
  export const DATABASE_PORT = 'port';

  /** The environment variable for the database username. */
  export const DATABASE_USERNAME = 'username';

  /** The environment variable for the database password. */
  export const DATABASE_PASSWORD = 'password';
}

export namespace ProfileConfig {
  /** The name of the profile configuration. */
  export const NAME = 'profileConfig';

  /** The environment variable for the profile default language. */
  export const PROFILE_API_KEY = 'apiKey';
}

export namespace JWTConfig {
  /** The name of the JWT configuration. */
  export const NAME = 'jwt';

  /** The environment variable for the JWT secret. */
  export const JWT_SECRET = 'secret';

  /** The environment variable for the JWT audience. */
  export const JWT_AUDIENCE = 'audience';

  /** The environment variable for the JWT issuer. */
  export const JWT_ISSUER = 'issuer';

  /** The environment variable for the JWT access token TTL. */
  export const JWT_ACCESS_TOKEN_TTL = 'accessTokenTtl';
}
