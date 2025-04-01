import { NextFunction, Request, Response } from "express";
import { UpdateUserUseCase } from "../../../useCases/user/UpdateUser/UpdateUserUseCase";

export class UpdateUserController {
  constructor(private updateUserUseCase: UpdateUserUseCase) {}

  async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.params.id;
      const data = req.body;

      const { StatusCode, message, body } = await this.updateUserUseCase.update(
        id,
        data
      );

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
