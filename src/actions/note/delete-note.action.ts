"use server";

import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export const deleteNoteAction = async (
  id: string,
): Promise<IResponseData<undefined>> => {
  try {
    const response = await serverFetch.delete(`/notes/${id}`);
    const result = await handleResponse<undefined>(
      response,
      "Unable to delete note.",
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
    };
  } catch {
    return {
      httpStatusCode: 500,
      success: false,
      message: "Unable to reach the server. Please try again.",
    };
  }
};
