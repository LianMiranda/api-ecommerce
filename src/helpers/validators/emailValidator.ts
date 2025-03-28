import isEmail from "validator/lib/isEmail";
import { IHttpReturn } from "../../api/controllers/protocols";
import { CustomError } from "../CustomError/customError";

export async function emailValidator(
  email: string
): Promise<IHttpReturn<object>> {
  try {
    const checkEmail = isEmail(email);

    if (!checkEmail) {
      throw new CustomError("Informe um endereço de email válido", 400);
    }

    return {
      status: true,
      StatusCode: 200,
      message: "OK",
      body: {},
    };
  } catch (error) {
    console.error(error);

    throw new CustomError("Internal server error", 500);
  }
}
