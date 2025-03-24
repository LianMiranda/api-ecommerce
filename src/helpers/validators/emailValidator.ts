import isEmail from "validator/lib/isEmail";
import { IHttpReturn } from "../../api/controllers/protocols";

export async function emailValidator(email: string):Promise<IHttpReturn<object>>{

    try {
        const checkEmail = isEmail(email);
      
        if (!checkEmail) {
          return {
            status: false,
            StatusCode: 400,
            message: "Informe um endereço de email válido",
            body: {},
          };
        }
      
        return {
          status: true,
          StatusCode: 200,
          message: "OK",
          body: {},
        };
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
