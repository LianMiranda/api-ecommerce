import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../../useCases/user/Delete/DeleteUserUseCase";
import { NextFunction } from "express-serve-static-core";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const { StatusCode, message, body } = await this.deleteUserUseCase.delete(
        id
      );

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      console.error(error);
      next(error)
    }
  }
}
