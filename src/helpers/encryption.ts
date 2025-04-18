import bcrypt from "bcrypt"
import { env } from "../config/env";

export async function hashPassword(password: string){
    const salt: string | number = env.encryption.salt || 10

    if(salt === undefined){
        throw Error("Salt is not defined")
    }

    const genSalt = await bcrypt.genSalt(Number(salt))
    const hash: string = await bcrypt.hash(password, genSalt.toString());

    return hash;
}

export async function compare(inputPassword: string, passwordToBeVerified: string){
    const verify = await bcrypt.compare(inputPassword, passwordToBeVerified);

    return verify
}