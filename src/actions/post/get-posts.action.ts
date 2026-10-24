import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type Post = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type GetPostsParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export const getPostsAction = async (
  params: GetPostsParams,
): Promise<IResponseData<{ posts: Post[] }>> => {
  try {
    const query = new URLSearchParams();

    if (params.search) query.set("search", params.search);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const qs = query.toString();
    const url = qs ? `/posts?${qs}` : "/posts";
    const response = await serverFetch.get(url);
    const result = await handleResponse<{ posts: Post[] }>(
      response,
      "Unable to fetch posts.",
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
