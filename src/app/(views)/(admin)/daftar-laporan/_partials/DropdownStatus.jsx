"use client"

import Link from "next/link";
import { useState } from "react";

export default function DropdownStatus(props) {
  const [isOpenDropdownm, setIsOpenDropdown] = useState(false)
  const reportStatus = props.reportStatus;

  let statusColor = "bg-white";
  if (reportStatus == "Ditolak") {
    statusColor = "bg-red-500"
  } else if (reportStatus == "Menunggu") {
    statusColor = "bg-gray-500";
  } else if (reportStatus == "Diproses") {
    statusColor = "bg-yellow-500";
  } else if (reportStatus == "Selesai") {
    statusColor = "bg-green-500"
  } else {
    statusColor = "bg-white";
  }

  return (
    <div>
      <button type="button" id="btn-dropdown" onClick={() => setIsOpenDropdown(!isOpenDropdownm)} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5">
        <div className="flex justify-start items-center gap-2">
          <i className={`${statusColor} p-1 border border-gray-500 rounded-full`}></i>
          {reportStatus ? reportStatus : 'Semua'}
        </div>
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="dropdown-list" className={`${!isOpenDropdownm && 'hidden'} absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
        <ul className="py-1 text-sm text-gray-700 shadow-lg">
          <li>
            <Link href="/daftar-laporan" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-white border border-gray-500 rounded-full"></i>
              Semua
            </Link>
          </li>
          <li>
            <Link href="/daftar-laporan/menunggu" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-gray-500 border border-gray-500 rounded-full"></i>
              Menunggu
            </Link>
          </li>
          <li>
            <Link href="/daftar-laporan/diproses" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-yellow-500 border border-gray-500 rounded-full"></i>
              Diproses
            </Link>
          </li>
          <li>
            <Link href="/daftar-laporan/selesai" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-green-500 border border-gray-500 rounded-full"></i>
              Selesai
            </Link>
          </li>
          <li>
            <Link href="/daftar-laporan/ditolak" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-red-500 border border-gray-500 rounded-full"></i>
              Ditolak
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
