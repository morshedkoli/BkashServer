import { VerifyToken } from "@/utility/JWTTokenHelper";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
  let token = await req.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  } else {
    try {
      let token = await req.cookies.get("token");
      let payload = await VerifyToken(token["value"]);
      const requestHeader = new Headers(req.headers);
      requestHeader.set("email", payload["email"]);
      requestHeader.set("id", payload["id"]);
      requestHeader.set("role", payload["role"]);

      return NextResponse.next({ request: { headers: requestHeader } });
    } catch (e) {
      const requestHeader = new Headers(req.headers);
      requestHeader.set("email", "0");
      requestHeader.set("id", "0");
      requestHeader.set("role", "0");

      return NextResponse.next({ request: { headers: requestHeader } });
    }
  }
}

export const config = {
  matcher: [
    "/api/payment/:path*",
    "/api/recharge/:path*",
    "/api/transection/:path*",
    "/api/user/admin/:path*",
    "/api/user/profile/:path*",
    "/api/users/:path*",
    "/api/partners/:path*",
    "/",
    "/profile/:path*",
    "/settings/:path*",
    "/send/:path*",
    "/partner/:path*",
    "/client/:path*",
    "/admin/:path*",
  ],
};
