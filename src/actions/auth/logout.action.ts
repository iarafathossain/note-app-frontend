"use server";

import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";
import { setBackendCookies } from "@/utils/set-backend-cookies";

export const logoutAction = async (): Promise<IResponseData<undefined>> => {
  try {
    const response = await serverFetch.post("/auth/logout");
    const result = await handleResponse<undefined>(
      response,
      "Unable to log out.",
    );

    if (!result.success) {
      return {
        httpStatusCode: response.status,
        success: false,
        message: result.message,
      };
    }

    await setBackendCookies(response);
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
