import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/users/user.service";
import { IUserInput } from "./userProtocols";

export async function create(req: Request<0, 0, IUserInput>, res: Response, next: NextFunction){
  try {
    const data = req.body;
    data.birthday = new Date(data.birthday)
    const {StatusCode, message, body} = await UserService.create(data);

    res.status(StatusCode).json({message, body});

  } catch (error) {
    res.json({error: "Internal server error"})
    next(error)
  }
}
