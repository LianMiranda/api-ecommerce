import { Request, Response } from "express";
import { ProfileUseCase } from "../../../useCases/user/Profile/ProfileUseCase";

export class ProfileController {
  constructor(private profileUseCase: ProfileUseCase) {}

  async profile(req: Request, res: Response): Promise<Response> {
    const id = req.user!.id;

    const { StatusCode, message, body } = await this.profileUseCase.profile(id);

    return res.status(StatusCode).json({ message, body });
  }
}
