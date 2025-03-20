import express from "express";
import { createUserController } from "../api/useCases/user/CreateUser";
import { findAllUsersController } from "../api/useCases/user/FindAllUsers";
import { findUserByIdController } from "../api/useCases/user/FindUserById";
import { updateUserController } from "../api/useCases/user/UpdateUser";

export const router = express.Router();


router.post("/user", async (req, res) => {
    createUserController.create(req, res)
});

router.get("/users", async (req, res) => {
    findAllUsersController.findAll(req, res)
});

router.get("/user/:id", async (req, res) => {
    findUserByIdController.findUserById(req, res)
});

router.put("/user/:id", async (req, res) => {
    updateUserController.update(req, res)
});
