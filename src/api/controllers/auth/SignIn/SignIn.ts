import {Request, Response } from "express";
import { SignInUseCase } from "../../../useCases/auth/SignIn/SignInUseCase";

export class SignInController{
  constructor(
    private signInUseCase: SignInUseCase
  ){}

  async signIn(req: Request, res: Response):Promise<Response>{
    const data = req.body;
    
    try {
      const {StatusCode, message, body} = await this.signInUseCase.signIn(data);
  
      return res.status(StatusCode).json({message, body});
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({message: "Internal server error", error})
    }
}
}
