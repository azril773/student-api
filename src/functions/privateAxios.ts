import axios from "axios"
export const axiosA = axios.create({baseURL:"http://localhost:3300/api",withCredentials:true})