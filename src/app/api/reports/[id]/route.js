import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

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
        message: "Detail laporan tidak ditemukan!",
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

    const { fullname, reportStatus, adminId, reportStatusIndo } = await request.json();
    const report = await prisma.report.update({
      where: {
        id,
      },
      data: {
        reportStatus: reportStatus,
      },
    });

    const logAudits = await prisma.logAudit.create({
      data: {
        adminId: adminId,
        action: `Mengubah status laporan ${id} oleh ${fullname} ke ${reportStatusIndo}`,
      },
    });

    return NextResponse.json(
      {
        sucess: true,
        message: "Berhasil memperbarui status laporan!",
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
          message: "Gagal memperbarui status laporan",
          error: err,
        },
        {
          status: 400,
        }
      );
  }
}