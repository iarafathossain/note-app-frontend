"use server";

import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type ManagedUserInput = {
  name: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  interests: string[];
};

export const createUserAction = async (
  input: ManagedUserInput,
): Promise<IResponseData<{ user: ManagedUserInput & { id: string } }>> => {
  try {
    const response = await serverFetch.post("/users", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const result = await handleResponse<{
      user: ManagedUserInput & { id: string };
    }>(response, "Unable to create user.");
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
