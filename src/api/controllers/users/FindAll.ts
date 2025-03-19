import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/users/user.service";

export async function findAll(req: Request, res: Response, next: NextFunction){
  try {
     const {StatusCode, message, body} = await UserService.findAll();

     res.status(StatusCode).json({message, body});
    } catch (error) {
    next(error)
  }
}
