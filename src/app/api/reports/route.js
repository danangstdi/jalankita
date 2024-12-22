import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req) {
  try {
    const url = req.nextUrl;
    const access = url.searchParams.get('access');

    const filterConditions = {};
    if (access) {
      filterConditions.province = access;
    }

    const reports = await prisma.report.findMany({
      where: filterConditions,
    });
    const sortedReports = reports.sort((a, b) => {
      const statusPriority = {
        PENDING: 1,
        PROGRESS: 2,
        RESOLVED: 3,
        REJECTED: 4,
      };

      return statusPriority[a.reportStatus] - statusPriority[b.reportStatus];
    });

    const totalReports = await prisma.report.count({
      where: filterConditions,
    });
    const totalPending = await prisma.report.count({
      where: {
          ...filterConditions,
          reportStatus: "PENDING",
      },
    });
    const totalProgress = await prisma.report.count({
      where: {
          ...filterConditions,
          reportStatus: "PROGRESS",
      },
    });
    const totalResolved = await prisma.report.count({
      where: {
          ...filterConditions,
          reportStatus: "RESOLVED",
      },
    });
    const totalRejected = await prisma.report.count({
      where: {
          ...filterConditions,
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
          error: error.message 
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
        message: "Berhasil mengirim laporan!",
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
        message: "Gagal mengirim laporan", 
        error: error.message },
      { 
        status: 500 
      }
    );
  }
}