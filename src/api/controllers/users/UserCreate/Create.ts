import { NextFunction, Request, Response } from "express";
import { CreateUserUseCase } from "../../../useCases/user/CreateUser/CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const data = req.body;

    try {
      const { StatusCode, message, body } = await this.createUserUseCase.create(
        data
      );

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      next(error);
    }
  }
}
