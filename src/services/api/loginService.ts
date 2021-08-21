import { httpClient } from "./httpClient";

export type LoginCredentials = {
  username: string;
  password: string;
}

type LoginResponse = {
  data: {
    token: string
  }
}

export const login = async (credentials: LoginCredentials): Promise<string> => {
  const { data } = await httpClient.post<LoginCredentials, LoginResponse>("/login", credentials)
  return data.token
}