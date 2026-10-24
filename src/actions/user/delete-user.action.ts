"use server";

import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export const deleteUserAction = async (
  id: string,
): Promise<IResponseData<undefined>> => {
  try {
    const response = await serverFetch.delete(`/users/${id}`);
    const result = await handleResponse<undefined>(
      response,
      "Unable to delete user.",
    );
    return result.success
      ? {
          httpStatusCode: response.status,
          success: true,
          message: result.message,
        }
      : {
          httpStatusCode: response.status,
          success: false,
          message: result.message,
        };
  } catch {
    return {
      httpStatusCode: 500,
      success: false,
      message: "Unable to reach the server. Please try again.",
    };
  }
};
