import { isDate } from "validator";
import { IHttpReturn } from "../../api/controllers/protocols";

export async function dateValidator(
  date: string
): Promise<IHttpReturn<object>> {
  try {
    const checkDate = isDate(date, { format: "YYYY-MM-DD", strictMode: true });
    
    if (!checkDate)
      return {
    status: false,
    StatusCode: 400,
    message: "Verifique se a data esta no formato YYYY-MM-DD",
    body: {},
  };
  
    const birthDate = new Date(date);
    const today = new Date();
    const minDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (birthDate > minDate) {
      return {
        status: false,
        StatusCode: 400,
        message: "Você precisa ter pelo menos 18 anos!",
        body: {},
      };
    }

    return { status: true, StatusCode: 200, message: "Ok", body: {} };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      StatusCode: 500,
      message: "Erro interno no servidor.",
      body: {},
    };
  }
}
