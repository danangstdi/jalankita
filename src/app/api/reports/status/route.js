import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    const url = req.nextUrl;
    const reportStatusParam = url.searchParams.get('reportStatus');
    const access = url.searchParams.get('access');

    const filterConditions = {};

    if (access) {
      filterConditions.province = access;
    }

    if (reportStatusParam) {
      filterConditions.reportStatus = reportStatusParam;
    }

    const reports = await prisma.report.findMany({
      where: filterConditions,
    });

    const total = await prisma.report.count({
      where: filterConditions,
    });

    return NextResponse.json(
      {
        success: true,
        message: `List Data Reports ${reportStatusParam}`,
        total: total,
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