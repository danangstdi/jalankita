import { getDataNoCache } from "@/app/sevices/getDataNoCache";
import AddAdmin from "./AddAdmin";
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
                      <p className="font-normal text-gray-500">
                        Kata Sandi: {admin.noEncryptPassword}
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
                    <button 
                      className="relative p-3 text-white overflow-hidden bg-slate-800 
                                before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                                hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                                hover:z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                      </svg>
                    </button>
                    <button
                      className="relative p-3 text-white overflow-hidden bg-slate-800 
                                before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                                hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                                hover:z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  );
}
