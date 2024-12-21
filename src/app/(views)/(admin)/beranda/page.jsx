import { cookies } from "next/headers"
import DashboardNav from "../_partials/DashboardNav"
import StatsCard from "../beranda/_partials/StatsCard"
import { getDataNoCache } from "@/app/sevices/getDataNoCache"
import Chart from "./_partials/Chart"
import AdminFooter from "@/app/components/AdminFooter"
import NewReport from "./_partials/NewReport"

export default async function Dashboard() {
  const session = await cookies();
  const access = session.get("jalankita_auth_access").value;
  let endpoint = '';
  if (access !== 'ALL') {
    endpoint = `reports?access=${access}`;
  } else {
    endpoint = 'reports';
  }

  const reports = await getDataNoCache(`${process.env.NEXT_PUBLIC_APP_URL}/api/${endpoint}`)

  return (
    <>
      <DashboardNav page="Beranda"/>
      <main>
        <section className='bg-slate-50 p-4 mx-2 shadow-lg lg:ml-[19rem] lg:py-5'>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full gap-4">
              <StatsCard title="Total Laporan" color="emerald" main={reports.totalReports} link="/daftar-laporan"/>
              <StatsCard title="Laporan Belum Selesai" color="slate" main={reports.totalPending + reports.totalProgress} link={`/daftar-laporan/${reports.totalProgress > 0 ? 'diproses' : 'menunggu'}`}/>
              <StatsCard title="Laporan Selesai" color="slate" main={reports.totalResolved} link="/daftar-laporan/selesai"/>
              <StatsCard title="Laporan Ditolak" color="slate" main={reports.totalRejected} link="/daftar-laporan/ditolak"/>
          </div>
        </section>
        <section className="mt-2 mx-2 lg:ml-[19rem]">
          <div className="grid lg:grid-cols-4 gap-2 w-full">
            <div className='lg:col-span-3 bg-slate-50 p-4 shadow-lg lg:py-5'>
              <Chart/>
            </div>
            <div className='lg:col-span-1 bg-slate-50 p-3 w-full shadow-lg'>
              <NewReport data={reports.data}/>
            </div>
          </div>
        </section>
      </main>
      <AdminFooter/>
    </>
  )
}
