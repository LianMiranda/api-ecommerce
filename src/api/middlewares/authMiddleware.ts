import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../helpers/auth/token";
import { JsonWebTokenError } from "jsonwebtoken";

interface IUserPayload {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

declare module "express" {
  export interface Request {
    user?: IUserPayload;
  }
}

async function isAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const headerAuth = req.headers.authorization;

    if (!headerAuth || headerAuth.trim() === "") {
      res
        .status(401)
        .json({ message: "Usuário não autorizado, token não fornecido" });
      return;
    }
    const token = headerAuth!.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "Token inválido." });
      return;
    }

    const decoded = (await verifyToken(token)) as IUserPayload | undefined;

    if (!decoded) {
      res.status(401).json({ message: "Token inválido." });
      return;
    }

    req.user = decoded;

    next();
  } catch (error) {
    console.error(error);
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export { isAuthenticate };
