import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
})

export async function register({username, email, password}) {
  const responce = await api.post("/api/auth/register", {
    username,
    email,
    password
  })
  return responce.data
}

export async function login({email, password}) {
  const responce = await api.post("/api/auth/login", {
    email,
    password
  })
  return responce.data
}

export async function getMe() {
  const responce = await api.get("/api/auth/get-me")
  return responce.data
}