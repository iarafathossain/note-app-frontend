import { env } from "@/env";
import { cookies } from "next/headers";
import { setBackendCookies } from "./set-backend-cookies";

type FetchOptions = RequestInit;

const buildCookieHeader = async () => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

const serverFetchHelper = async (
  endpoint: string,
  options: FetchOptions = {},
): Promise<Response> => {
  const cookieHeader = await buildCookieHeader();
  const headers = new Headers(options.headers);

  if (cookieHeader) headers.set("Cookie", cookieHeader);

  const url = `${env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`;
  let response = await fetch(url, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  });

  // Intercept 401 Unauthorized to handle token refresh
  if (response.status === 401 && !endpoint.includes("/auth/refresh")) {
    const refreshResponse = await fetch(
      `${env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { Cookie: await buildCookieHeader() },
        cache: "no-store",
      },
    );

    if (refreshResponse.ok) {
      // Save the newly minted access and refresh tokens to Next.js cookies
      await setBackendCookies(refreshResponse);

      // Re-build headers with the new cookies and retry the original request
      const retriedCookieHeader = await buildCookieHeader();
      const retriedHeaders = new Headers(options.headers);
      if (retriedCookieHeader)
        retriedHeaders.set("Cookie", retriedCookieHeader);

      response = await fetch(url, {
        ...options,
        headers: retriedHeaders,
        cache: options.cache ?? "no-store",
      });
    }
  }

  return response;
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
