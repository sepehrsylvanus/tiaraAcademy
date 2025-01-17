import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("token")?.value;
  const url = request.nextUrl.clone();
  const referrer = request.headers.get("referer") || "/";
  console.log({ referrer });
  if (url.pathname === "/sign-in") {
    if (referrer.endsWith("/")) {
      console.log("ends with /");
      url.searchParams.set("referrer", "/");
      console.log({ url });
      return NextResponse.rewrite(url);
    } else {
      console.log("It is not home");
      url.searchParams.set("referrer", referrer);
      return NextResponse.rewrite(url);
    }
  }

  if (!currentUser && request.nextUrl.pathname === "/hub") {
    return Response.redirect(new URL("/sign-in", request.url));
  }
  if (
    (currentUser && request.nextUrl.pathname.startsWith("/sign-in")) ||
    (currentUser && request.nextUrl.pathname.startsWith("/sign-up"))
  ) {
    return Response.redirect(new URL("/hub", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
