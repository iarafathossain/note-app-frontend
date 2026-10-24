import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type CurrentUser = {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: string;
};

export const getCurrentUserAction = async (): Promise<
  IResponseData<{ user: CurrentUser }>
> => {
  try {
    const response = await serverFetch.get("/auth/me");
    const result = await handleResponse<{ user: CurrentUser }>(
      response,
      "Unable to fetch your account details.",
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
    };
  } catch {
    return {
      httpStatusCode: 500,
      success: false,
      message: "Unable to reach the server. Please try again.",
    };
  }
};
