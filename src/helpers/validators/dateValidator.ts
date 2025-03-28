import { isDate } from "validator";
import { IHttpReturn } from "../../api/controllers/protocols";
import { CustomError } from "../CustomError/customError";

export async function dateValidator(
  date: string
): Promise<IHttpReturn<object>> {
  try {
    const checkDate = isDate(date, { format: "YYYY-MM-DD", strictMode: true });

    if (!checkDate)
      throw new CustomError(
        "Verifique se a data esta no formato YYYY-MM-DD",
        400
      );

    const birthDate = new Date(date);
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (birthDate > minDate) {
      throw new CustomError("Você precisa ter pelo menos 18 anos!", 400);
    }

    return { status: true, StatusCode: 200, message: "Ok", body: {} };
  } catch (error) {
    console.error(error);
    throw new CustomError("Internal server error", 500);
  }
}
