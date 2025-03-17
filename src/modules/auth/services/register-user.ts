import axiosClient from "../../../common/config/axios-client";

export interface IRegisterUserPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const registerUser = (payload: IRegisterUserPayload) =>
  axiosClient.post("/register", payload);
