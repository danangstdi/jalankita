import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { cookies } from "next/headers";

export async function GET(request, { params }) {
  const id = parseInt(params.id);
  const report = await prisma.report.findUnique({
    where: {
      id,
    },
  });

  if (!report) {
    return NextResponse.json(
      {
        sucess: true,
        message: "Detail Report Not Found!",
        data: null,
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      sucess: true,
      message: "Detail Data Report",
      data: report,
    },
    {
      status: 200,
    }
  );
}

export async function PATCH(request, { params }) {
  try {
    const id = parseInt(params.id);
    const session = await cookies();
    const adminIdFromSession = session.get('jalankita_auth_adminId').value;

    const { reportStatus } = await request.json();
    const report = await prisma.report.update({
      where: {
        id,
      },
      data: {
        reportStatus: reportStatus,
      },
    });

    const sendDataLogAudit = {
      adminId: adminIdFromSession,
      action: `Change report status ${id} to ${reportStatus}`,
    };
    await fetch("http://localhost:3000/api/logAudits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendDataLogAudit),
    });

    return NextResponse.json(
      {
        sucess: true,
        message: "Report Status Updated!",
        data: report,
      },
      {
        status: 200,
      }
    );
  } catch(err) {
      return NextResponse.json(
        {
          sucess: false,
          message: "Report Status Updated Failed",
          error: err,
        },
        {
          status: 400,
        }
      );
  }
}