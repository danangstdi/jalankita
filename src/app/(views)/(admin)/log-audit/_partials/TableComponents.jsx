import { FormatDate } from "@/app/components/FormatDate";
import { getDataNoCache } from "@/app/sevices/getDataNoCache";

export default async function TableComponents() {
  const getLogAudit = await getDataNoCache(`${process.env.NEXT_PUBLIC_BASEURL}/api/logAudits`);
  const logAudits = getLogAudit.data;

  return (
    <div className="overflow-x-auto shadow-md w-full sm:rounded-lg">
      <div className="px-4 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
        {/* <DropdownStatus reportStatus={props.setReportStatus} /> */}
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative">
          {/* <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div> */}
          {/* <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search"/> */}
        </div>
      </div>
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 bg-gray-50">
          <tr>
            {/* <th scope="col" className="px-6 py-3 w-16">
              NO
            </th> */}
            <th scope="col" className="px-6 py-3">
              ADMIN
            </th>
            <th scope="col" className="px-6 py-3">
              AKTIFITAS
            </th>
            <th scope="col" className="px-6 py-3">
              TANGGAL
            </th>
          </tr>
        </thead>
        <tbody>
          {logAudits.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Belum ada data masuk
              </td>
            </tr>
          ) : logAudits.map((log, index) => (
                <tr key={log.id} className="bg-white border-b hover:bg-gray-50">
                  {/* <td className="px-6 py-4 text-gray-900">{index + 1}</td> */}
                  <td scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                      <div className="text-base font-semibold">
                        {log.adminId}
                      </div>
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    <p className="font-normal text-gray-500">
                      {
                        FormatDate(log.actionAt)
                      }
                    </p>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
