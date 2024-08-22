import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    let headerList = headers();
    let id = headerList.get("id");
    let role = headerList.get("role");

    if (role === "admin") {
      const prisma = new PrismaClient();

      const result = await prisma.admin.findUnique({ where: { id: id } });
      return NextResponse.json({ status: "success", data: result });
    }

    if (role === "partner") {
      const prisma = new PrismaClient();

      const result = await prisma.partner.findUnique({ where: { id: id } });
      return NextResponse.json({ status: "success", data: result });
    }

    if (role === "user") {
      const prisma = new PrismaClient();

      const result = await prisma.user.findUnique({ where: { id: id } });
      return NextResponse.json({ status: "success", data: result });
    }
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      data: e,
    });
  }
}
