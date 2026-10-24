import { IResponseData } from "@/interfaces/util-type";

type ResponsePayload<T> = {
  message?: string;
  data?: T;
  errorSources?: Array<{ message?: string }>;
  meta?: IResponseData<T>["meta"];
};

export async function handleResponse<T>(
  response: Response,
  fallbackMessage = "Request failed",
): Promise<IResponseData<T>> {
  const result = (await response
    .json()
    .catch(() => ({}))) as ResponsePayload<T>;

  if (!response.ok) {
    return {
      httpStatusCode: response.status,
      success: false,
      message:
        result.errorSources
          ?.map((source: { message?: string }) => source.message)
          .filter((message): message is string => Boolean(message))
          .join(", ") || fallbackMessage,
    };
  }

  return {
    httpStatusCode: response.status,
    success: true,
    message: result.message || "Request successful",
    data: result.data,
    meta: result.meta,
  };
}
