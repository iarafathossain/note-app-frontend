import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type Note = {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type GetNotesParams = {
  search?: string;
  page?: number;
  limit?: number;
};

export const getNotesAction = async (
  params: GetNotesParams,
): Promise<IResponseData<{ notes: Note[] }>> => {
  try {
    const query = new URLSearchParams();

    if (params.search) query.set("search", params.search);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));

    const qs = query.toString();

    const url = qs ? `/notes?${qs}` : "/notes";

    const response = await serverFetch.get(url);

    const result = await handleResponse<{ notes: Note[] }>(
      response,
      "Unable to fetch notes.",
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
