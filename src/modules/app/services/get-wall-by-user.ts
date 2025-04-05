import axiosClient from "../../../common/config/axios-client";

export interface IUserWall {
  id: string;
  name: string;
  email: string;
  username: string;
}

export const getWallByUser = (username: string) =>
  axiosClient.get<{ data: IUserWall }>(`/wall/${username}`);
