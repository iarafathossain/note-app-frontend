import { cookies } from "next/headers";
import setCookieParser from "set-cookie-parser";

export const setBackendCookies = async (response: Response) => {
  const setCookieHeaders = response.headers.getSetCookie?.() || [];

  if (setCookieHeaders.length === 0) {
    throw new Error("Authentication response did not include session cookies.");
  }

  const parsedCookies = setCookieParser.parse(setCookieHeaders);
  const cookieStore = await cookies();

  for (const cookie of parsedCookies) {
    cookieStore.set({
      name: cookie.name,
      value: cookie.value,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure,
      sameSite: cookie.sameSite as "lax" | "strict" | "none" | undefined,
      path: cookie.path,
      maxAge: cookie.maxAge,
      expires: cookie.expires,
    });
  }
};
