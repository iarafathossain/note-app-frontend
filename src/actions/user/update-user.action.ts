"use server";

import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";
import type { ManagedUserInput } from "./create-user.action";

export type UpdateUserInput = Partial<ManagedUserInput>;

export const updateUserAction = async (
  id: string,
  input: UpdateUserInput,
): Promise<IResponseData<{ user: UpdateUserInput & { id: string } }>> => {
  try {
    const response = await serverFetch.patch(`/users/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const result = await handleResponse<{
      user: UpdateUserInput & { id: string };
    }>(response, "Unable to update user.");
    return result.success
      ? { ...result, httpStatusCode: response.status }
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
