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
  const getAdmin = await getDataNoCache(`${process.env.NEXT_PUBLIC_BASEURL}/api/admin`);
  const admins = getAdmin.data;

  return (
    <div className="overflow-x-auto shadow-md w-full sm:rounded-lg">
      <div className="p-4 bg-white">
        <AddAdmin/>
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
                    <GenerateNewPassword adminId={admin.adminId}/>
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
