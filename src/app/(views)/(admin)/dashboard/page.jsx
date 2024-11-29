import DashboardNav from "../_partials/DashboardNav"
import StatsCard from "./_partials/StatsCard"
import { getDataNoCache } from "@/app/sevices/getDataNoCache"

export default async function Dashboard() {
  const total = await getDataNoCache('http://localhost:3000/api/reports')

  return (
    <>
      <DashboardNav page="Dashboard"/>
      <main className='m-2 flex justify-between items-center bg-slate-50 p-4 shadow-lg lg:ml-[19rem] lg:py-5'>
        <section className="grid md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
            <StatsCard title="Total Laporan" color="emerald" main={total.totalReports} small="Perhari ini sebanyak 1.200 Laporan"/>
            <StatsCard title="Laporan Belum Selesai" color="slate" main={total.totalPending} small="Perhari ini sebanyak 420 Laporan"/>
            <StatsCard title="Laporan Selesai" color="slate" main={total.totalResolved} small="Perhari ini sebanyak 200 Laporan"/>
            <StatsCard title="Laporan Ditolak" color="slate" main={total.totalRejected} small="Perhari ini sebanyak 18 Laporan"/>
        </section>
      </main>
    </>
  )
}
