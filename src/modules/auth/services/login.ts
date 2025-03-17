import axiosClient from "../../../common/config/axios-client";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface ILoginResponse {
  token: string;
  user: IUser;
}

export const login = (payload: ILoginPayload) =>
  axiosClient.post<ILoginResponse>("/login", payload);
