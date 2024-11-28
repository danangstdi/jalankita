import DashboardNav from "../_partials/DashboardNav"
import Table from "./_partials/Table"

export default function LihatLaporan() {
  return (
    <>
      <DashboardNav page="Lihat Laporan"/>

      <main className='m-2 flex justify-between items-center bg-slate-50 p-4 shadow-lg lg:ml-[19rem] lg:py-5'>
        <Table/>
      </main>
    </>
  )
}
