import useSWR from "swr";
import { getUser } from "../services/get-user";

export const useGetUser = () => {
  const req = useSWR([getUser], async () => {
    const res = await getUser();
    return res.data;
  });

  return req;
};
