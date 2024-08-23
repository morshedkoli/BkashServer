import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();

    let headerList = headers();
    let id = headerList.get("id");
    let role = headerList.get("role");

    if (role !== "user") {
      return NextResponse.json({
        status: "fail",
        data: "Only Client Send Money",
      });
    }

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
      // reqBody.firstBalance = balance;
      // reqBody.lastBalance = balance - amount;
      // reqBody.senderNumber = " ";
      // reqBody.transectionId = " ";
      // reqBody.status = "pending";
      // reqBody.clientId = id;
      const newBalance = balance - amount;

      const updateBalance = await prisma.user.update({
        where: { id: id },
        data: { balance: newBalance },
      });

      const newData = {
        clientId: id,
        firstBalance: balance,
        lastBalance: balance - amount,
        senderNumber: " ",
        transectionId: " ",
        status: "pending",
        amount: amount,
        type: reqBody.type,
        number: reqBody.number,
      };

      const result = await prisma.transection.create({
        data: newData,
      });

      return NextResponse.json({
        status: "success",
        data: "Send Money Submit Successfully",
      });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: "There is some problem" });
  }
}
