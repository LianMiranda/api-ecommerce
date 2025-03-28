import express from "express";
import { createUserController } from "../api/useCases/user/CreateUser";
import { findAllUsersController } from "../api/useCases/user/FindAllUsers";
import { findUserByIdController } from "../api/useCases/user/FindUserById";
import { updateUserController } from "../api/useCases/user/UpdateUser";
import { deleteUserController } from "../api/useCases/user/Delete";
import { signInController } from "../api/useCases/auth/SignIn";
import { profileController } from "../api/useCases/user/Profile";
import { isAuthenticate } from "../api/middlewares/authMiddleware";
import { regiterController } from "../api/useCases/auth/Register";

export const router = express.Router();

router.post("/user", async (req, res, next) => {
  createUserController.create(req, res, next);
});

router.get("/users", isAuthenticate, async (req, res, next) => {
  findAllUsersController.findAll(req, res, next);
});

router.get("/user/profile", isAuthenticate, async (req, res) => {
  profileController.profile(req, res);
});

router.get("/user/:id", async (req, res) => {
  findUserByIdController.findUserById(req, res);
});

router.put("/user/:id", async (req, res) => {
  updateUserController.update(req, res);
});

router.delete("/user/:id", async (req, res) => {
  deleteUserController.delete(req, res);
});

//auth
router.post("/signIn", async (req, res) => {
  signInController.signIn(req, res);
});

router.post("/register", async (req, res) => {
  regiterController.register(req, res);
});
