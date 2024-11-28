import ImgZoom from "./ImgZoom";
import Detail from "./Detail";
import DropdownStatus from "./DropdownStatus";
import { getDataNoCache } from "@/app/sevices/getDataNoCache";

async function fetchLocationName(id, type) {
  const apiUrls = {
    province: `https://api.cahyadsn.com/province/${id}`,
    regency: `https://api.cahyadsn.com/regency/${id}`,
    district: `https://api.cahyadsn.com/district/${id}`,
  };

  const response = await fetch(apiUrls[type]);
  if (!response.ok) {
    console.error(`Failed to fetch ${type} name for ID: ${id}`);
    return null;
  }
  const data = await response.json();
  return data.data.nama;
}

export default async function Table() {
  const getReports = await getDataNoCache('http://localhost:3000/api/reports');
  const reports = getReports.data;

  const reportsWithLocationNames = await Promise.all(
    reports.map(async (report) => {
      const [provinceId, regencyId, districtId] = report.district.split('.');
      const [province, regency, district] = await Promise.all([
        fetchLocationName(provinceId, 'province'),
        fetchLocationName(provinceId + '.' + regencyId, 'regency'),
        fetchLocationName(provinceId + '.' + regencyId + '.' + districtId, 'district'),
      ]);

      return {
        ...report,
        locationName: `${district}, ${regency}, ${province}`,
      };
    })
  );

  return (
    // <div className="relative overflow-x-auto shadow-md w-full sm:rounded-lg">
    <div className="overflow-x-auto shadow-md w-full sm:rounded-lg">
            <div className="px-4 flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white">
                <DropdownStatus/>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for users"/>
                </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            PELAPOR
                        </th>
                        <th scope="col" className="px-6 py-3">
                            LOKASI
                        </th>
                        <th scope="col" className="px-6 py-3">
                            STATUS
                        </th>
                        <th scope="col" className="px-6 py-3">
                            AKSI
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {reportsWithLocationNames.map((report) => (
                      <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                            <ImgZoom photo={report.photo} alt={report.locationName}/>
                            <div className="ps-3">
                                <div className="text-base font-semibold">{report.fullname}</div>
                                <p className="font-normal text-gray-500">
                                  {report.reportAt}
                                </p>
                            </div>  
                        </th>
                        <td className="px-6 py-4 text-slate-800">
                          {report.locationName}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center">
                                <div className={`h-2.5 w-2.5 rounded-full 
                                ${report.reportStatus == 'PENDING' && 'bg-gray-500'} 
                                ${report.reportStatus == 'PROGRESS' && 'bg-yellow-500'} 
                                ${report.reportStatus == 'RESOLVED' && 'bg-green-500'} 
                                ${report.reportStatus == 'REJECTED' && 'bg-red-500'} 
                                me-2`}></div>
                                {report.reportStatus}
                            </div>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                            <Detail detailText={report.detail} detailPhoto={report.photo} detailFullName={report.fullname}/>
                            <button type='submit' 
                                className='relative p-3 text-white overflow-hidden bg-slate-800 
                                before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                                hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                                hover:z-10'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                                </svg>
                            </button>
                            <a href={`https://wa.me/${report.whatsapp}?text=Halo%20saya%20blablablabla`} target="_blank" 
                            className='relative p-3 text-white overflow-hidden bg-slate-800 
                            before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                            hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                            hover:z-10'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                                </svg>
                            </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
  )
}
