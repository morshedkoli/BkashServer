import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { SendEmail } from "@/utility/EmailUtility";

export async function GET(req, res) {
  try {
    const prisma = new PrismaClient();
    let { searchParams } = new URL(req.url);
    let email = searchParams.get("email");
    let role = searchParams.get("role");

    //userCount
    if (role === "admin") {
      const count = await prisma.admin.count({ where: { email } });
      if (count === 1) {
        let code = Math.floor(100000 + Math.random() * 900000);
        let EmailText = `Your OTP Code is ${code}`;
        let EmailSubject = "Jack App Verification Code";
        await SendEmail(email, EmailText, EmailSubject);

        let result = await prisma.admin.update({
          where: { email: email },
          data: { otp: code.toString() },
        });

        return NextResponse.json({
          status: "success",
          data: "6 Digit OTP code has been sent to your email",
        });
      }
    }

    if (role === "partner") {
      const count = await prisma.partner.count({ where: { email } });
      if (count === 1) {
        let code = Math.floor(100000 + Math.random() * 900000);
        let EmailText = `Your OTP Code is ${code}`;
        let EmailSubject = "Jack App Verification Code";
        await SendEmail(email, EmailText, EmailSubject);

        let result = await prisma.partner.update({
          where: { email: email },
          data: { otp: code.toString() },
        });

        return NextResponse.json({
          status: "success",
          data: "6 Digit OTP code has been sent to your email",
        });
      }
    }

    if (role === "user") {
      const count = await prisma.user.count({ where: { email } });
      if (count === 1) {
        let code = Math.floor(100000 + Math.random() * 900000);
        let EmailText = `Your OTP Code is ${code}`;
        let EmailSubject = "Jack App Verification Code";
        await SendEmail(email, EmailText, EmailSubject);

        let result = await prisma.user.update({
          where: { email: email },
          data: { otp: code.toString() },
        });

        return NextResponse.json({
          status: "success",
          data: "6 Digit OTP code has been sent to your email",
        });
      }
    } else {
      return NextResponse.json({ status: "Fail", data: "No User Found" });
    }
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
