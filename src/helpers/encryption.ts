import { env } from "../config/env"
import bcrypt from "bcrypt"

export async function hashPassword(password: string){
    if(env.encryption.salt === undefined){
        throw Error("Salt is not defined")
    }

    const salt: string | number = env.encryption.salt
    const genSalt = await bcrypt.genSalt(Number(salt))
    const hash: string = await bcrypt.hash(password, genSalt.toString());

    return hash;
}