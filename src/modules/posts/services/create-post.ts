import axiosClient from "../../../common/config/axios-client";

interface ICreatePostPayload {
  title: string;
  description: string;
  image: File;
}

export const createPost = (payload: ICreatePostPayload) =>
  axiosClient.postForm("/post/create", payload);
