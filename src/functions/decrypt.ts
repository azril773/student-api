import axios from "axios"
import { axiosA } from "./privateAxios"
export async function DecryptJwt(jwt: string) {
    try {
        const result = await axiosA.post("/jwt/decrypt", {
            jwt
        })
        return result.data.data
    } catch (error) {
        throw error
    }
}