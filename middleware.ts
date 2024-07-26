import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

export default async function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get("x-your-custom-locale") || "fa";
  const currentUser = request.cookies.get("token")?.value;

  if (!currentUser && request.nextUrl.pathname.startsWith("/hub")) {
    return Response.redirect(new URL("/sign-in", request.url));
  }
  if (
    (currentUser && request.nextUrl.pathname.startsWith("/sign-in")) ||
    (currentUser && request.nextUrl.pathname.startsWith("/sign-up"))
  ) {
    return Response.redirect(new URL("/hub", request.url));
  }
  const handleI18nRouting = createMiddleware({
    locales: ["en", "fa"],
    defaultLocale: "fa",
  });
  const response = handleI18nRouting(request);

  response.headers.set("x-your-custom-locale", defaultLocale);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fa|en)/:path*"],
};
