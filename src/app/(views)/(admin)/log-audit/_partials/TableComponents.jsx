import { FormatDate } from "@/app/components/FormatDate";
import { getDataNoCache } from "@/app/sevices/getDataNoCache";

export default async function TableComponents() {
  const getLogAudit = await getDataNoCache(`${process.env.NEXT_PUBLIC_BASEURL}/api/logAudits`);
  const logAudits = getLogAudit.data;

  return (
    <div className="overflow-x-auto shadow-md w-full sm:rounded-lg">
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
