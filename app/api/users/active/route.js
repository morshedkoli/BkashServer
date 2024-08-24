import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let userId = searchParams.get("userId");
    let headerList = headers();
    let id = headerList.get("id");
    //userCount

    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      return NextResponse.json({
        status: "fail",
        data: "You have no permission",
      });
    } else {
      let result = await prisma.user.update({
        where: { id: userId },
        data: { active: true },
      });

      return NextResponse.json({
        status: "success",
        data: "User Activated successfully",
      });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
