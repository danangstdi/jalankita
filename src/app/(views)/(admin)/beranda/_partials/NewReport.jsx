import Link from "next/link";

export default function NewReport(props) {
  const reports = props.data;
  const latestReports = reports.slice(0, 3);

  return (
    <div className='w-full'>
      <h5 className='text-sm font-bold'>
        LAPORAN TERBARU
      </h5>
      <hr className='my-2 border-slate-500 border-opacity-40' />
      <div className='overflow-y-scroll h-fit'>
        {latestReports.length === 0 ? <span className="text-xs text-slate-500">Belum ada laporan masuk!</span> 
        : latestReports.map((report, index) => (
          <Link key={report.id} href="/daftar-laporan">
            <div className='relative group mt-2 hover:cursor-pointer hover:duration-300'>
              <img src={report.photo} loading="lazy" alt="" className='w-full max-h-36 object-cover rounded-xl group-hover:brightness-75' />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:duration-500 transition-opacity">
                <span className="text-white px-4 py-2 text-sm">Selengkapnya</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
