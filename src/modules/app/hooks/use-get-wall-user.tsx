import useSWR from "swr";
import { getWallByUser } from "../services/get-wall-by-user";

export const useGetWallUser = (username?: string) => {
  const req = useSWR(username ? [getWallByUser, username] : null, async () => {
    const res = await getWallByUser(username!);
    return res.data.data;
  });

  return req;
};
