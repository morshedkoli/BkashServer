import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();

    let headerList = headers();
    let id = headerList.get("id");

    const user = await prisma.user.findUnique({ where: { id: id } });

    let reqBody = await req.json();
    let amount = parseInt(reqBody["amount"]);
    let balance = parseInt(user["balance"]);
    if (balance < amount) {
      return NextResponse.json({
        status: "fail",
        data: "Insufficient Balance",
      });
    } else {
      reqBody.firstBalance = balance;
      reqBody.lastBalance = balance - amount;
      reqBody.senderNumber = " ";
      reqBody.transectionId = " ";
      reqBody.status = "pending";
      reqBody.clientId = id;

      const result = await prisma.transection.create({
        data: reqBody,
      });
      return NextResponse.json({ status: "success", data: result });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
