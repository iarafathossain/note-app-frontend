"use server";

import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type CreateNoteResponseData = {
  note?: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
};

export const createNoteAction = async (input: {
  title: string;
  content: string;
}): Promise<IResponseData<CreateNoteResponseData>> => {
  try {
    const response = await serverFetch.post("/notes", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const result = await handleResponse<CreateNoteResponseData>(
      response,
      "Unable to create note.",
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
