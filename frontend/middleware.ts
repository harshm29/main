import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "./src/router/routes";

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("currentUser")?.value;

  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route)
    ) &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiredAt)
  ) {
    request.cookies.delete("currentUser");
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("currentUser");

    return response;
  }
  if (
    authRoutes.includes(request.nextUrl.pathname) &&
    currentUser &&
    typeof currentUser != undefined
  ) {
    if (JSON.parse(currentUser).user) {
      const userType = JSON.parse(currentUser).user?.type;

      if (userType == "user") {
        return NextResponse.redirect(new URL("/user/vote", request.url));
      } else if (userType == "admin") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }

  return null;
}
