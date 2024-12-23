import ImgZoom from "./ImgZoom";
import Detail from "./Detail";
import DropdownStatus from "./DropdownStatus";
import { getDataNoCache } from "@/app/sevices/getDataNoCache";
import StatusSelector from "./StatusSelector";
import { FormatDate } from "@/app/components/FormatDate";

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

export default async function TableComponents(props) {
  const getReports = await getDataNoCache(props.api);
  const reports = getReports.data;
  const statusMap = {
    PENDING: { text: "Menunggu", color: "bg-gray-500" },
    PROGRESS: { text: "Proses", color: "bg-yellow-500" },
    RESOLVED: { text: "Selesai", color: "bg-green-500" },
    REJECTED: { text: "Ditolak", color: "bg-red-500" },
  };

  const reportsWithLocationNames = await Promise.all(
    reports.map(async (report) => {
      const [provinceId, regencyId, districtId] = report.district.split(".");
      const [province, regency, district] = await Promise.all([
        fetchLocationName(provinceId, "province").catch(() => "Provinsi Tidak Diketahui"),
        fetchLocationName(provinceId + "." + regencyId, "regency").catch(() => "Kota/Kabupaten Tidak Diketahui"),
        fetchLocationName(provinceId + "." + regencyId + "." + districtId, "district").catch(() => "Kecamatan/Kelurahan Tidak Diketahui"),
      ]);

      return {
        ...report,
        locationName: `${district}, ${regency}, ${province}`,
      };
    })
  );

  return (
    <div className="overflow-x-auto shadow-md w-full sm:rounded-lg">
      <div className="p-4 bg-white">
        <DropdownStatus reportStatus={props.setReportStatus} />
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
          {reportsWithLocationNames.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                Belum ada laporan masuk
              </td>
            </tr>
            ) : reportsWithLocationNames.map((report) => (
                <tr key={report.id} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                    <ImgZoom photo={report.photo} alt={report.locationName} />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {report.fullname}
                      </div>
                      <p className="font-normal text-gray-500">
                        {
                          FormatDate(report.reportAt)
                        }
                      </p>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-slate-800">
                    {report.locationName}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`h-2.5 w-2.5 rounded-full me-2 ${statusMap[report.reportStatus]?.color || 'bg-gray-500'}`}
                      ></div>
                      {statusMap[report.reportStatus]?.text || 'Menunggu'}
                    </div>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Detail
                      detailText={report.detail}
                      detailPhoto={report.photo}
                      detailFullName={report.fullname}
                    />
                    <StatusSelector id={report.id} fullname={report.fullname} />
                    <a href={`https://wa.me/${report.whatsapp}?text=Halo%20saya%20blablablabla`} target="_blank"
                      className="relative p-3 text-white overflow-hidden bg-slate-800 
                                before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                                hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                                hover:z-10"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                      </svg>
                    </a>
                  </td>
                </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
