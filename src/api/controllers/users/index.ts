import { create } from "./Create";
import { deleteUser } from "./Delete";
import { findAll } from "./FindAll";
import { findById } from "./FindById";

export const UserController = {
  create,
  findAll,
  findById,
  deleteUser,
};
