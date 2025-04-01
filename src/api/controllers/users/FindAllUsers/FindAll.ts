import { NextFunction, Request, Response } from "express";
import { FindAllUsersUseCase } from "../../../useCases/user/FindAllUsers/FindAllUsersUseCase";

export class FindAllUsersController {
  constructor(private findAllUsersUseCase: FindAllUsersUseCase) {}

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { StatusCode, message, body } =
        await this.findAllUsersUseCase.findAll();

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      next(error);
    }
  }
}
