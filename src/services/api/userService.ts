import { httpClient } from "./httpClient";

type UserResponse = {
    firstName: string;
    lastName: string;
}

export const getUser = async (): Promise<UserResponse> => {
    const { data } = await httpClient.get<UserResponse>("/user")
    return data
}