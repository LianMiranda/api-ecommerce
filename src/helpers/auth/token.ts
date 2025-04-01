import jwt from "jsonwebtoken";
import { User } from "../../api/entities/User/User";
import { env } from "../../config/env";

async function tokenGenerate(user: User, expiresIn: number): Promise<string> {
  if (!env.secret) {
    throw Error("Secret not found");
  }

  const token = jwt.sign({ id: user.id, email: user.email }, env.secret, {
    expiresIn: expiresIn,
  });

  return token;
}

async function verifyToken(token: string) {
  if (!env.secret) {
    throw Error("Secret not found");
  }

  const verify = jwt.verify(token, env.secret);

  return verify;
}

export { tokenGenerate, verifyToken };
