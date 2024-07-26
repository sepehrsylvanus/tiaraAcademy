import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
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
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
