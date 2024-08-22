import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let reqBody = await req.json();
    let headerList = headers();
    let id = headerList.get("id");
    const clientId = reqBody["clientId"];

    const admin = await prisma.admin.findUnique({ where: { id } });

    if (!admin) {
      return NextResponse.json({ status: "fail", data: "You Are Not Admin" });
    } else {
      const result = await prisma.recharge.create({
        data: reqBody,
      });

      const user = await prisma.user.update({
        where: { id: clientId },
        data: {
          balance: {
            increment: reqBody.amount,
          },
        },
      });

      return NextResponse.json({
        status: "success",
        data: {
          user,
          result,
        },
      });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
