import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { CreateToken } from "@/utility/JWTTokenHelper";

export async function POST(req, res) {
  try {
    const reqBody = await req.json();

    if (reqBody["role"] === "admin") {
      const prisma = new PrismaClient();
      const result = await prisma.admin.findUnique({ where: reqBody });
      if (!result) {
        return NextResponse.json({
          status: "fail",
          data: "Email or password doesn't match",
        });
      } else {
        let token = await CreateToken(
          result["email"],
          result["id"],
          result["role"]
        );
        let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`;
        return NextResponse.json(
          { status: "success", data: token },
          { status: 200, headers: { "set-cookie": cookieString } }
        );
      }
    }

    if (reqBody["role"] === "partner") {
      const prisma = new PrismaClient();
      const result = await prisma.partner.findUnique({ where: reqBody });
      if (!result) {
        return NextResponse.json({ status: "Partner Not Found", data: result });
      } else {
        let token = await CreateToken(
          result["email"],
          result["id"],
          result["role"]
        );
        let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`;
        return NextResponse.json(
          { status: "success", data: token },
          { status: 200, headers: { "set-cookie": cookieString } }
        );
      }
    } else {
      const prisma = new PrismaClient();
      const result = await prisma.user.findUnique({ where: reqBody });
      if (!result) {
        return NextResponse.json({ status: "User Not Found", data: result });
      } else {
        let token = await CreateToken(
          result["email"],
          result["id"],
          result["role"]
        );
        let expireDuration = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const cookieString = `token=${token}; expires=${expireDuration.toUTCString()}; path=/`;
        return NextResponse.json(
          { status: "success", data: token },
          { status: 200, headers: { "set-cookie": cookieString } }
        );
      }
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

export async function GET(req, res) {
  let expireDuration = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const response = NextResponse.redirect(new URL("/", req.url), 303);
  response.cookies.set("token", "", { expires: expireDuration });
  return response;
}
