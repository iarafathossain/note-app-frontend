import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type ManagedUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  interests: string[];
};

export const getUsersAction = async (params: {
  search?: string;
  page?: number;
  limit?: number;
}): Promise<IResponseData<{ users: ManagedUser[] }>> => {
  try {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.page) query.set("page", String(params.page));
    if (params.limit) query.set("limit", String(params.limit));
    const qs = query.toString();
    const response = await serverFetch.get(qs ? `/users?${qs}` : "/users");
    const result = await handleResponse<{ users: ManagedUser[] }>(
      response,
      "Unable to fetch users.",
    );
    if (!result.success) {
      return {
        httpStatusCode: response.status,
        success: false,
        message: result.message,
      };
    }
    return { ...result, httpStatusCode: response.status };
  } catch {
    return {
      httpStatusCode: 500,
      success: false,
      message: "Unable to reach the server. Please try again.",
    };
  }
};
