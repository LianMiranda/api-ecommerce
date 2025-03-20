import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/users/user.service";
import { IUserUpdate } from "./userProtocols";

export async function update(
  req: Request<{id: string},0,IUserUpdate>,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id;
    const data = req.body

    const {StatusCode, message, body } = await UserService.update(id, data);

    res.status(StatusCode).json({ message, body });
  } catch (error) {
    next(error);
  }
}