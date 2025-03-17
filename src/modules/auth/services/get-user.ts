import axiosClient from "../../../common/config/axios-client";
import { IUser } from "./login";

export const getUser = () => axiosClient.get<IUser>("/user");
