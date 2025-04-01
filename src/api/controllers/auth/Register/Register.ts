import { Request, Response } from "express";
import { RegisterUseCase } from "../../../useCases/auth/Register/RegiserUseCase";
import { NextFunction } from "express-serve-static-core";

export class RegisterUserController {
  constructor(private registerUseCase: RegisterUseCase) {}

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const data = req.body;

    try {
      const { StatusCode, message, access_token } =
        await this.registerUseCase.register(data);

      return res.status(StatusCode).json({ message, access_token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
