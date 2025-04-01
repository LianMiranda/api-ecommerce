import { config } from "dotenv";

config();

export const env = {
  port: process.env.PORT,
  secret: process.env.SECRET,
  database: process.env.DATABASE_URL,
  encryption: {
    salt: process.env.SALT_ROUNDS,
  },
};
