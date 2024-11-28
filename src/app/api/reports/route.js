import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET() {
  try {
    const reports = await prisma.report.findMany();
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

export async function POST(request) {
  try {
    const { fullname, whatsapp, province, regency, district, detail, photo } = await request.json();

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