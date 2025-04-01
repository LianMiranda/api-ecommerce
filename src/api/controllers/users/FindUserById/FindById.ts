import { NextFunction, Request, Response } from "express";
import { FindUserByIdUseCase } from "../../../useCases/user/FindUserById/FindUserByIdUseCase";

export class FindUserByIdController {
  constructor(private findUserByIdUseCase: FindUserByIdUseCase) {}

  async findUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.params.id;
      const { StatusCode, message, body } =
        await this.findUserByIdUseCase.findById(id);

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      next(error);
    }
  }
}
