import { cookies } from "next/headers"
import DashboardNav from "../../../_partials/DashboardNav"
import TableComponents from "../../_partials/TableComponents"
import AdminFooter from "@/app/components/AdminFooter";

export default async function page() {
  const session = await cookies();
  const access = session.get("jalankita_auth_access").value;
  
  let endpoint = '';
  if (access !== 'ALL') {
    endpoint = `reports/status?access=${access}&reportStatus=REJECTED`;
  } else {
    endpoint = `reports/status?reportStatus=REJECTED`;
  }

  return (
    <>
      <DashboardNav page="Daftar Laporan"/>

      <main className='m-2 flex justify-between items-center bg-slate-50 p-4 shadow-lg lg:ml-[19rem] lg:py-5'>
        <TableComponents api={`https://jalankita.vercel.app/api/${endpoint}`} setReportStatus="Ditolak"/>
      </main>

      <AdminFooter/>
    </>
  )
}
