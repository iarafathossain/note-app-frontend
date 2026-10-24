import { IResponseData } from "@/interfaces/util-type";
import { handleResponse } from "@/utils/handle-response";
import { serverFetch } from "@/utils/server-fetch";

export type GroupedInterestUser = {
  _id: string;
  name: string;
  email: string;
};

export type GroupedInterest = {
  interest: string;
  users: GroupedInterestUser[];
};

export const getUsersGroupedByInterestsAction = async (): Promise<
  IResponseData<{ groups: GroupedInterest[] }>
> => {
  try {
    const response = await serverFetch.get("/users/grouped-by-interests");
    const result = await handleResponse<{ groups: GroupedInterest[] }>(
      response,
      "Unable to fetch users grouped by interests.",
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
