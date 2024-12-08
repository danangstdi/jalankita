import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const logAudits = await prisma.logAudit.findMany({
      orderBy: {
        actionAt: 'desc',
      }
    });
    const totalLogAudit = await prisma.logAudit.count();

    return NextResponse.json(
      {
        success: true,
        message: "List Log Audit",
        totalLogAudit: totalLogAudit,
        data: logAudits,
      },
      {
        status: 200,
      }
    );
  }catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to fetch data", 
        error: error.message 
      },
      { 
        status: 500 
      }
    );
  }
}

export async function POST(request) {
  try {
    const { adminId, action } = await request.json();
    const logAudits = await prisma.logAudit.create({
      data: {
        adminId: adminId,
        action: action,
      },
    });

    const totalLogAudit = await prisma.logAudit.count();

    return NextResponse.json(
      {
        success: true,
        message: "Log audit Saved Successfully!",
        totalLogAudit: totalLogAudit,
        data: logAudits,
      },
      {
        status: 201
      }
    )
  }catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to save Log Audit", 
        error: error.message },
      { 
        status: 500 
      }
    );
  }
}