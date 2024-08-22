import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let reqBody = await req.json();

    if (reqBody["role"] === "admin") {
      const count = await prisma.admin.count({
        where: { otp: reqBody["otp"], email: reqBody["email"] },
      });
      if (count === 1) {
        await prisma.admin.update({
          where: { email: reqBody["email"] },
          data: { otp: "0", password: reqBody["password"] },
        });

        return NextResponse.json({
          status: "success",
          data: "Password Reset Success",
        });
      }
    }

    if (reqBody["role"] === "partner") {
      const count = await prisma.partner.count({
        where: { otp: reqBody["otp"], email: reqBody["email"] },
      });
      if (count === 1) {
        await prisma.partner.update({
          where: { email: reqBody["email"] },
          data: { otp: "0", password: reqBody["password"] },
        });

        return NextResponse.json({
          status: "success",
          data: "Password Reset Success",
        });
      }
    }

    if (reqBody["role"] === "user") {
      const count = await prisma.user.count({
        where: { otp: reqBody["otp"], email: reqBody["email"] },
      });
      if (count === 1) {
        await prisma.user.update({
          where: { email: reqBody["email"] },
          data: { otp: "0", password: reqBody["password"] },
        });

        return NextResponse.json({
          status: "success",
          data: "Password Reset Success",
        });
      }
    } else {
      return NextResponse.json({ status: "fail", data: "Password Reset Fail" });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
