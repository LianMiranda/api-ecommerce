import express from "express";
import { UserController } from "../api/controllers/users";

export const router = express.Router();

router.post("/user", UserController.create)