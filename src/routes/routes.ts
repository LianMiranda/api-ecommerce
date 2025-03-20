import express from "express";
import { createUserController } from "../api/useCases/user/CreateUser";

export const router = express.Router();


router.post("/user", async (req, res) => {
    createUserController.create(req, res)
});
