import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    let headerList = headers();
    let id = headerList.get("id");
    let role = headerList.get("role");
    const prisma = new PrismaClient();
    let reqBody = await req.json();

    if (role === "admin") {
      const result = await prisma.admin.update({
        where: { id: id },
        data: {
          name: reqBody.name,
          email: reqBody.email,
          mobile: reqBody.mobile,
          password: reqBody.password,
          active: reqBody.active,
          balance: {
            increment: reqBody.balance,
          },
        },
      });
      return NextResponse.json({ status: "success", data: result });
    }

    if (role === "partner") {
      const result = await prisma.partner.update({
        where: { id: id },
        data: {
          name: reqBody.name,
          email: reqBody.email,
          mobile: reqBody.mobile,
          password: reqBody.password,
          active: reqBody.active,
          balance: {
            increment: reqBody.balance,
          },
        },
      });
      return NextResponse.json({ status: "success", data: result });
    }

    if (role === "user") {
      const result = await prisma.user.update({
        where: { id: id },
        data: {
          name: reqBody.name,
          email: reqBody.email,
          mobile: reqBody.mobile,
          password: reqBody.password,
          active: reqBody.active,
          balance: {
            increment: reqBody.balance,
          },
        },
      });
      return NextResponse.json({ status: "success", data: result });
    }
    // return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      data: e,
    });
  }
}
