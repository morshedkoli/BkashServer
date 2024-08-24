import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { SendEmail } from "@/utility/EmailUtility";
import { headers } from "next/headers";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let clientId = searchParams.get("id");
    let headerList = headers();
    let id = headerList.get("id");

    const admin = await prisma.admin.findUnique({ where: { id } });

    if (!admin) {
      return NextResponse.json({
        status: "fail",
        data: "You have no permission",
      });
    } else {
      const result = await prisma.user.findUnique({
        where: { id: clientId },
        include: {
          transections: true,
          recharges: true,
        },
      });

      return NextResponse.json({ status: "success", data: result });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
