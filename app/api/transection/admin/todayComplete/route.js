import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    let headerList = headers();
    let id = headerList.get("id");

    const prisma = new PrismaClient();

    const admin = await prisma.admin.findUnique({
      where: { id: id },
    });

    if (!admin) {
      return NextResponse.json(
        { status: "fail", data: "Admin not found" },
        { headers: { "Content-Type": "application/json" } }
      );
    } else {
      const today = new Date();
      const result = await prisma.transection.findMany({
        where: {
          status: "completed",
          updatedAt: {
            gte: today,
            lte: today,
          },
        },
      });
      return NextResponse.json(
        { status: "success", data: result },
        { headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (e) {
    return NextResponse.json({
      status: "fail",
      data: e,
    });
  }
}
