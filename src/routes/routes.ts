import express from "express";
import { createUserController } from "../api/useCases/user/CreateUser";
import { findAllUsersController } from "../api/useCases/user/FindAllUsers";
import { findUserByIdController } from "../api/useCases/user/FindUserById";
import { updateUserController } from "../api/useCases/user/UpdateUser";
import { deleteUserController } from "../api/useCases/user/Delete";
import { signInController } from "../api/useCases/auth/SignIn";
import { profileController } from "../api/useCases/auth/Profile";
import { isAuthenticate } from "../api/middlewares/authMiddleware";
import { registerController } from "../api/useCases/auth/Register";

export const router = express.Router();

router.post("/user", async (req, res, next) => {
  createUserController.create(req, res, next);
});

router.get("/users", isAuthenticate, async (req, res, next) => {
  findAllUsersController.findAll(req, res, next);
});

router.get("/user/profile", isAuthenticate, async (req, res, next) => {
  profileController.profile(req, res, next);
});

router.get("/user/:id", async (req, res, next) => {
  findUserByIdController.findUserById(req, res, next);
});

router.put("/user/:id", async (req, res, next) => {
  updateUserController.update(req, res, next);
});

router.delete("/user/:id", async (req, res, next) => {
  deleteUserController.delete(req, res, next);
});

//auth
router.post("/signIn", async (req, res, next) => {
  signInController.signIn(req, res, next);
});

router.post("/register", async (req, res, next) => {
  registerController.register(req, res, next);
});
