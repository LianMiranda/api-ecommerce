import { Request, Response } from "express";
import { UpdateUserUseCase } from "../../../useCases/user/UpdateUser/UpdateUserUseCase";

export class UpdateUserController {

  constructor(
    private updateUserUseCase: UpdateUserUseCase
  ){}

  async update(
    req: Request,
    res: Response,
  ):Promise<Response>{
    try {
      const id = req.params.id;
      const data = req.body;

      const { StatusCode, message, body } = await this.updateUserUseCase.update(id, data);

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      return res.status(500).json({error: "Internal server error"})
      console.error(error);
    }
  }
}
