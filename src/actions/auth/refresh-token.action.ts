"use server";

import { IResponseData } from "@/interfaces/util-type";
import { UserRole } from "@/lib/route-config";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";
import { setBackendCookies } from "@/utils/set-backend-cookies";

export type RefreshTokenResponseData = {
  user?: { id: string; email: string; name: string; role: UserRole };
};

export const refreshTokenAction = async (): Promise<
  IResponseData<RefreshTokenResponseData>
> => {
  try {
    const response = await serverFetch.post("/auth/refresh");
    const result = await handleResponse<RefreshTokenResponseData>(
      response,
      "Unable to refresh the token.",
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
