import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    let headerList = headers();
    let id = headerList.get("id");

    const prisma = new PrismaClient();
    let reqBody = await req.json();

    let admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      return NextResponse.json({
        status: "fail",
        data: "You have no permission",
      });
    } else {
      const result = await prisma.user.update({
        where: { id: reqBody.clientId },
        data: {
          balance: {
            increment: parseInt(reqBody.rechargeAmount),
          },
        },
      });
      return NextResponse.json({ status: "success", data: "Update Balance" });
    }

    // return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    console.log("error is", e);
    return NextResponse.json({
      status: "fail",
      data: e,
    });
  }
}
