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

    const currentMonth = new Date().getMonth(); // Bulan saat ini (0-11)
    const months = [];
    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    
    // Membuat array bulan dari bulan pertama (Agustus) sampai bulan terakhir (Desember)
    for (let i = 0; i < 5; i++) {
      months.push((currentMonth - i + 12) % 12);
    }

    // Membalik urutan bulan agar dimulai dari bulan pertama (Agustus) hingga terakhir (Desember)
    const reversedMonths = months.reverse();
    
    // Query untuk mendapatkan jumlah laporan per bulan
    const reportCountsByMonth = await Promise.all(
      reversedMonths.map(async (month) => {
        const startOfMonth = new Date(new Date().getFullYear(), month, 1); // Awal bulan
        const endOfMonth = new Date(new Date().getFullYear(), month + 1, 0); // Akhir bulan
        
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

    // Mengambil bulan dalam urutan yang benar (Agustus, September, Oktober, November, Desember)
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
