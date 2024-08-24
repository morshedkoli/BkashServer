import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    let headerList = headers();
    let id = headerList.get("id");
    let role = headerList.get("role");
    const prisma = new PrismaClient();
    if (role === "admin") {
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

    if (role === "partner") {
      const result = await prisma.transection.findMany({
        where: {
          status: "completed",
          partnerId: id,
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
    } else {
      const result = await prisma.transection.findMany({
        where: {
          sstatus: "completed",
          clientId: id,
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
