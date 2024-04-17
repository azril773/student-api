import { axiosA } from "./privateAxios";

export default async function EncryptToken(obj,expired){
    try {
        const jwt = await axiosA.post("/jwt/encrypt/student", {
            ...obj,
            expired
          },{
            headers:{
              "Content-Type":"application/json"
            }
          })
          return jwt.data
    } catch (error) {
        throw error
    }
}


