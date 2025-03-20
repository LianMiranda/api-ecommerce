import { Request, Response } from "express";
import { FindAllUsersUseCase } from "../../../useCases/user/FindAllUsers/FindAllUsersUseCase";

export class FindAllUsersController {
  constructor(
    private findAllUsersUseCase: FindAllUsersUseCase
  ) {}

  async findAll(req: Request, res: Response) {
    try {
      const { StatusCode, message, body } = await this.findAllUsersUseCase.findAll();

      res.status(StatusCode).json({ message, body });
    } catch (error) {
      return res.status(500).json({error: "Internal server error"})
      console.error(error);
    }
  }
}
