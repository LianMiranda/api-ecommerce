import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/users/user.service";

export async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const { StatusCode, message, body } = await UserService.delete(id);

    res.status(StatusCode).json({ message, body });
  } catch (error) {
    next(error);
  }
}
