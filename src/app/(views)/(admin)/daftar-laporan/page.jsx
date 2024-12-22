import AdminFooter from "@/app/components/AdminFooter";
import DashboardNav from "../_partials/DashboardNav"
import TableComponents from "./_partials/TableComponents"
import { cookies } from "next/headers";

export default async function DaftarLaporan() {
  const session = await cookies();
  const access = session.get("jalankita_auth_access").value;
  const endpoint = access !== 'ALL' ? `reports?access=${access}` : 'reports';

  return (
    <>
      <DashboardNav page="Daftar Laporan"/>

      <main className='m-2 flex justify-between items-center bg-slate-50 p-4 shadow-lg lg:ml-[19rem] lg:py-5'>
        <TableComponents api={`${process.env.NEXT_PUBLIC_BASEURL}/api/${endpoint}`} setReportStatus="Semua"/>
      </main>

      <AdminFooter/>
    </>
  )
}
