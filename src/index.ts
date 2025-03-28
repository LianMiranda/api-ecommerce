import express from "express";
import { router } from "./routes/routes";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router)