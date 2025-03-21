import { Request, Response } from "express";
import { DeleteUserUseCase } from "../../../useCases/user/Delete/DeleteUserUseCase";

export class DeleteUserController {
  constructor(private deleteUserUseCase: DeleteUserUseCase) {}

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const { StatusCode, message, body } = await this.deleteUserUseCase.delete(
        id
      );

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
      console.error(error);
    }
  }
}
