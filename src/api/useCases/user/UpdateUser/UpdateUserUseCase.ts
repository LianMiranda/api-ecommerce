import { compare } from "bcrypt";
import { IUserRepository } from "../../../repositories/user/IUserRepository";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";
import { hashPassword } from "../../../../helpers/encryption";

export class UpdateUserUseCase{
    constructor(
        private userRepository: IUserRepository
    ){}

     async update(
        id: string,
        data: IUpdateUserRequestDTO
      ){
    
        const user = await this.userRepository.findById(id);
        
        if(!user){
          return {
            status: false,
            StatusCode: 404,
            message: "Usuário não encontrado",
            body: {},
          };
        }
    
        const userUpdate: IUpdateUserRequestDTO = {};
    
        if (data.fullName && data.fullName.trim() != "") userUpdate.fullName = data.fullName;
        if (data.email && data.email.trim() != "") userUpdate.email = data.email;
        if (data.cpf && data.cpf.trim() != "") userUpdate.cpf = data.cpf;
        if (data.birthday && data.birthday.toString().trim() != "") userUpdate.birthday = new Date(data.birthday);
        if (data.password && data.password.trim() != "") {

          const isValidPassword = await compare(data.actualPassword ?? "", user?.password ?? "");
    
          if (!isValidPassword) {
            return {
              status: false,
              StatusCode: 400,
              message: "As senhas não condizem",
              body: {},
            };
          }
    
          const hash = await hashPassword(data.password);
    
          userUpdate.password = hash;
        }
      
        try {
          const update = await this.userRepository.update(id, userUpdate);
    
          return {
            status: true,
            StatusCode: 200,
            message: "Usuário atualizado com sucesso",
            body: update,
          };
        } catch (error) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((error as any).code === "P2002") {
            return {
              status: false,
              StatusCode: 400,
              message: "Email ou CPF já cadastrados",
              body: {},
            };
          }
    
          console.log(error);
    
          return {
            status: false,
            StatusCode: 500,
            message: "Internal server error",
            body: {},
          };
        }
      }
}