import dotenv from "dotenv";
dotenv.config();

export const APP = {
  PORT: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  CRYPTO_KEY: process.env.CRYPTO_KEY,
  JWT_KEY: process.env.JWT_KEY
};
