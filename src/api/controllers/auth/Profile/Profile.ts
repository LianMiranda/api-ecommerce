import { NextFunction, Request, Response } from "express";
import { ProfileUseCase } from "../../../useCases/auth/Profile/ProfileUseCase";

export class ProfileController {
  constructor(private profileUseCase: ProfileUseCase) {}

  async profile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const id = req.user!.id;

      const { StatusCode, message, body } = await this.profileUseCase.profile(
        id
      );

      return res.status(StatusCode).json({ message, body });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
