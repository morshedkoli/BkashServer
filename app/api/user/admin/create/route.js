import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    let reqBody = await req.json();
    reqBody.otp = "0";
    reqBody.balance = 0;
    reqBody.active = true;
    reqBody.role = "admin";
    const prisma = new PrismaClient();
    const result = await prisma.admin.create({
      data: reqBody,
    });
    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
