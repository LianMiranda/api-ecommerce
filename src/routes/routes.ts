import express from "express";
import { createUserController } from "../api/useCases/user/CreateUser";
import { findAllUsersController } from "../api/useCases/user/FindAllUsers";

export const router = express.Router();


router.post("/user", async (req, res) => {
    createUserController.create(req, res)
});

router.get("/users", async (req, res) => {
    findAllUsersController.findAll(req, res)
});
