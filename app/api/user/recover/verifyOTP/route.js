import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let reqBody = await req.json();
    const count = await prisma.user.count({ where: reqBody });
    if (count === 1) {
      return NextResponse.json({ status: "success", data: "Valid OTP Code" });
    } else {
      const count = await prisma.partner.count({ where: reqBody });

      if (count === 1) {
        return NextResponse.json({ status: "success", data: "Valid OTP Code" });
      } else {
        const count = await prisma.admin.count({ where: reqBody });
        if (count === 1) {
          return NextResponse.json({
            status: "success",
            data: "Valid OTP Code",
          });
        } else {
          return NextResponse.json({
            status: "fail",
            data: "Invalid OTP Code",
          });
        }
      }
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
