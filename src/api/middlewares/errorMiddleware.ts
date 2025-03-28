import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../helpers/CustomError/customError";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: Error | CustomError, req: Request, res: Response, next: NextFunction){
  console.error("Erro capturado!!!!!!!!!!!!!!!", err);

  if(err instanceof CustomError){
    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(status).json({ status: false, message });
  }

  return res.status(500).json({ message: "Erro interno no servidor" });
}

export { errorHandler };
