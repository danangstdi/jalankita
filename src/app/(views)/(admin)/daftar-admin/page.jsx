import DashboardNav from "../_partials/DashboardNav"
import TableComponents from "./_partials/TableComponents"

export default function page() {
  return (
    <>
      <DashboardNav page='Daftar Admin'/>

      <main className='m-2 flex justify-between items-center bg-slate-50 p-4 shadow-lg lg:ml-[19rem] lg:py-5'>
        <TableComponents/>
      </main>
    </>
  )
}
