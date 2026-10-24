import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";
import type { Post } from "./get-posts.action";

export type UserPostsResponseData = {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  posts: Post[];
};

export const getUserPostsAction = async (
  userId: string,
  params: { page?: number; limit?: number } = {},
): Promise<IResponseData<UserPostsResponseData>> => {
  try {
    const query = new URLSearchParams();
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const qs = query.toString();
    const url = qs
      ? `/posts/${userId}/posts?${qs}`
      : `/posts/${userId}/posts`;
    const response = await serverFetch.get(url);
    const result = await handleResponse<UserPostsResponseData>(
      response,
      "Unable to fetch user posts.",
    );

    if (!result.success) {
      return {
        httpStatusCode: response.status,
        success: false,
        message: result.message,
      };
    }

    return {
      httpStatusCode: response.status,
      success: true,
      message: result.message,
      data: result.data,
      meta: result.meta,
    };
  } catch {
    return {
      httpStatusCode: 500,
      success: false,
      message: "Unable to reach the server. Please try again.",
    };
  }
};
