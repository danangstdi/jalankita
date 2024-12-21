import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    const url = req.nextUrl;
    const access = url.searchParams.get('access');

    const filterConditions = {};
    if (access) {
      filterConditions.province = access;
    }

    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

    const currentMonth = new Date().getMonth();
    const months = [];
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    for (let i = 0; i < 5; i++) {
      months.push((currentMonth - i + 12) % 12);
    }

    const reversedMonths = months.reverse();
    
    const reportCountsByMonth = await Promise.all(
      reversedMonths.map(async (month) => {
        const startOfMonth = new Date(new Date().getFullYear(), month, 1);
        const endOfMonth = new Date(new Date().getFullYear(), month + 1, 0);
        
        const count = await prisma.report.count({
          where: {
            ...filterConditions,
            reportAt: {
              gte: startOfMonth,
              lte: endOfMonth,
            },
          },
        });

        return count;
      })
    );

    const monthNamesForResponse = reversedMonths.map(month => monthNames[month]);
    
    return NextResponse.json(
      {
        success: true,
        message: "Reports 5 bulan terakhir",
        months: monthNamesForResponse,
        values: reportCountsByMonth,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch data",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
