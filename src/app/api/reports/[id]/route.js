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

    const { reportStatus } = await request.json();
    const report = await prisma.report.update({
      where: {
        id,
      },
      data: {
        reportStatus: reportStatus,
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