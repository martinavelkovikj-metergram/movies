import dotenv from "dotenv";
dotenv.config();

interface DbConfig {
  username: string;
  password: string;
  database: string;
}

interface Config {
  db: DbConfig;
  goTinyUrl: string;
  apiKey: string;
}

function readEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

const config: Config = {
  db: {
    username: readEnvVariable("DATABASE_USERNAME"),
    password: readEnvVariable("DATABASE_PASSWORD"),
    database: readEnvVariable("DATABASE_NAME"),
  },
  goTinyUrl: readEnvVariable("GOTINY_URL"),
  apiKey: readEnvVariable("API_KEY")
};

export { config };
