"use server";

import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type UpdatePostResponseData = {
  post?: {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const updatePostAction = async (
  id: string,
  input: { title: string; content: string },
): Promise<IResponseData<UpdatePostResponseData>> => {
  try {
    const response = await serverFetch.patch(`/posts/${id}`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const result = await handleResponse<UpdatePostResponseData>(
      response,
      "Unable to update post.",
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
