import { Request, Response } from "express";
import { RegisterUseCase } from "../../../useCases/auth/Register/RegiserUseCase";

export class RegisterUserController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async register(req: Request, res: Response): Promise<Response> {
    const data = req.body;

    try {
      const { StatusCode, message, access_token } =
        await this.registerUseCase.register(data);

      return res.status(StatusCode).json({ message, access_token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}
