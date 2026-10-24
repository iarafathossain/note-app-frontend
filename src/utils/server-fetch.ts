import { env } from "@/env";
import { cookies } from "next/headers";

type FetchOptions = RequestInit;

const serverFetchHelper = async (
  endpoint: string,
  options: FetchOptions = {},
): Promise<Response> => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");

  const headers = new Headers(options.headers);

  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  return fetch(`${env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });
};

export const serverFetch = {
  get: (endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: (endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: (endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: (endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: (endpoint: string, options: FetchOptions = {}) =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};
