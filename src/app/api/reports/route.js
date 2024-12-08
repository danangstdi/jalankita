import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const reports = await prisma.report.findMany();
    const sortedReports = reports.sort((a, b) => {
      const statusPriority = {
        PENDING: 1,
        PROGRESS: 2,
        RESOLVED: 3,
        REJECTED: 4,
      };

      return statusPriority[a.reportStatus] - statusPriority[b.reportStatus];
    });

    const totalReports = await prisma.report.count();
    const totalPending = await prisma.report.count({
      where: {
          reportStatus: "PENDING",
      },
    });
    const totalProgress = await prisma.report.count({
      where: {
          reportStatus: "PROGRESS",
      },
    });
    const totalResolved = await prisma.report.count({
      where: {
          reportStatus: "RESOLVED",
      },
    });
    const totalRejected = await prisma.report.count({
      where: {
          reportStatus: "REJECTED",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "List Data Reports",
        totalReports: totalReports,
        totalPending: totalPending,
        totalProgress: totalProgress,
        totalResolved: totalResolved,
        totalRejected: totalRejected,
        data: sortedReports,
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
    const { fullname, whatsapp, province, regency, district, detail, photo } = await request.json();

    if (!photo) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Harap lampirkan foto sebagai bukti", 
          // error: "Harap lampirkan foto sebagai bukti" 
        },
        { 
          status: 401
        }
      );
    }

    const report = await prisma.report.create({
      data: {
        fullname: fullname,
        whatsapp: whatsapp,
        province: province,
        regency: regency,
        district: district,
        detail: detail,
        photo: photo
      },
    });

    const totalReports = await prisma.report.count();
    const totalPending = await prisma.report.count({
      where: {
          reportStatus: "PENDING",
      },
    });
    const totalProgress = await prisma.report.count({
      where: {
          reportStatus: "PROGRESS",
      },
    });
    const totalResolved = await prisma.report.count({
      where: {
          reportStatus: "RESOLVED",
      },
    });
    const totalRejected = await prisma.report.count({
      where: {
          reportStatus: "REJECTED",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Report Created Successfully!",
        totalReports: totalReports,
        totalPending: totalPending,
        totalProgress: totalProgress,
        totalResolved: totalResolved,
        totalRejected: totalRejected,
        data: report,
      },
      {
        status: 201
      }
    )
  }catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: "Failed to create report", 
        error: error.message },
      { 
        status: 500 
      }
    );
  }
}