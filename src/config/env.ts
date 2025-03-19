import { config } from "dotenv";

config();

export = {
    port: process.env.PORT,
    database: process.env.DATABASE_URL
}