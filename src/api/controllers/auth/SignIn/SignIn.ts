import { Request, Response } from "express";
import { SignInUseCase } from "../../../useCases/auth/SignIn/SignInUseCase";
import { NextFunction } from "express-serve-static-core";

export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const data = req.body;

    try {
      const { StatusCode, message, access_token } = await this.signInUseCase.signIn(
        data
      );

      return res.status(StatusCode).json({ message, access_token });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
