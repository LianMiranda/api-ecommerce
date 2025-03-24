import {Request, Response } from "express";
import { CreateUserUseCase } from "../../../useCases/user/CreateUser/CreateUserUseCase";

export class CreateUserController{
  constructor(
    private createUserUseCase: CreateUserUseCase
  ){}

  async create(req: Request, res: Response):Promise<Response>{
    const data = req.body;
    
    try {
      const {StatusCode, message, body} = await this.createUserUseCase.create(data);
  
      return res.status(StatusCode).json({message, body});
  
    } catch (error) {
      return res.status(500).json({message: "Internal server error", error})
      console.error(error);
    }
}
}
