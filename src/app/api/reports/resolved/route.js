import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      where: {
        reportStatus: "RESOLVED",
      },
    });

    const totalResolved = await prisma.report.count({
      where: {
          reportStatus: "RESOLVED",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "List Data Reports",
        totalResolved: totalResolved,
        data: reports,
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