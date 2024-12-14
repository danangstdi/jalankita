import { getDataNoCache } from "@/app/sevices/getDataNoCache";
import AddAdmin from "./AddAdmin";
import DeleteAdmin from "./DeleteAdmin";
import GenerateNewPassword from "./GenerateNewPassword";
import { FormatDate } from "@/app/components/FormatDate";

async function fetchLocationName(kode) {
  const provinceApi = `https://api.cahyadsn.com/province/${kode}`

  const response = await fetch(provinceApi);
  if (!response.ok) {
    console.error(`Failed to fetch name for kode: ${kode}`);
    return null;
  }
  const data = await response.json();
  return data.data.nama;
}

export default async function TableComponents() {
  const getAdmin = await getDataNoCache('http://localhost:3000/api/admin');
  const admins = getAdmin.data;

  return (
    <div className="overflow-x-auto shadow-md w-full sm:rounded-lg">
      <div className="px-4 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
        <AddAdmin/>
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
            <th scope="col" className="px-6 py-3 w-16">
              NO
            </th>
            <th scope="col" className="px-6 py-3">
              ADMIN KREDENSIAL
            </th>
            <th scope="col" className="px-6 py-3">
              LEVEL
            </th>
            <th scope="col" className="px-6 py-3">
              HAK AKSES
            </th>
            <th scope="col" className="px-6 py-3">
              TERDAFTAR
            </th>
            <th scope="col" className="px-6 py-3">
              AKSI
            </th>
          </tr>
        </thead>
        <tbody>
          {admins.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Daftar admin masih kosong
              </td>
            </tr>
          ) : admins.map((admin, index) => (
                <tr key={admin.id} className="bg-white border-b hover:bg-gray-50">
                  <th className="px-6 py-4 text-gray-900">{index + 1}.</th>
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                    <div>
                      <div className="text-base font-semibold">
                        {admin.adminId}
                      </div>
                      <p className={`font-normal text-gray-500`}>
                        Kata Sandi: {admin.noEncryptPassword == '' 
                        ? <span className="text-red-500">Terenkripsi</span> 
                        : admin.noEncryptPassword}
                      </p>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-slate-800">
                    {admin.level}
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    {fetchLocationName(admin.access)}
                  </td>
                  <td className="px-6 py-4 text-slate-800">
                    {
                      FormatDate(admin.registerAt)
                    }
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <GenerateNewPassword adminIntId={admin.id}/>
                    <DeleteAdmin adminIntId={admin.id}/>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
