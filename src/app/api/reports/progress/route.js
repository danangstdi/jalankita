import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      where: {
        reportStatus: "PROGRESS",
      },
    });

    const totalProgress = await prisma.report.count({
      where: {
          reportStatus: "PROGRESS",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "List Data Reports",
        totalProgress: totalProgress,
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