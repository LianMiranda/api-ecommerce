import express from "express";
import { UserController } from "../api/controllers/users";

export const router = express.Router();

router.post("/user", UserController.create);
router.get("/users", UserController.findAll);
router.get("/user/:id", UserController.findById);
router.delete("/user/:id", UserController.deleteUser);
