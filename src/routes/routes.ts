import express from "express";
import { createUserController } from "../api/useCases/user/CreateUser";
import { findAllUsersController } from "../api/useCases/user/FindAllUsers";
import { findUserByIdController } from "../api/useCases/user/FindUserById";
import { updateUserController } from "../api/useCases/user/UpdateUser";
import { deleteUserController } from "../api/useCases/user/Delete";
import { signInController } from "../api/useCases/auth/SignIn";

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

router.delete("/user/:id", async (req, res) => {
    deleteUserController.delete(req, res)
});

//auth
router.post("/signIn", async (req, res) => {
    signInController.signIn(req, res);
});
  
