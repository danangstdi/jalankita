"use client"

import Link from "next/link";
import { useState } from "react";

export default function DropdownStatus({ reportStatus }) {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false)

  const statusColors = {
    Ditolak: "bg-red-500",
    Menunggu: "bg-gray-500",
    Diproses: "bg-yellow-500",
    Selesai: "bg-green-500",
    default: "bg-white",
  };

  const statusOptions = [
    { text: "Semua", link: "/daftar-laporan", color: "bg-white" },
    { text: "Menunggu", link: "/daftar-laporan/menunggu", color: "bg-gray-500" },
    { text: "Diproses", link: "/daftar-laporan/diproses", color: "bg-yellow-500" },
    { text: "Selesai", link: "/daftar-laporan/selesai", color: "bg-green-500" },
    { text: "Ditolak", link: "/daftar-laporan/ditolak", color: "bg-red-500" },
  ];

  const statusColor = statusColors[reportStatus] || statusColors.default;

  return (
    <div>
      <button type="button" id="btn-dropdown" onClick={() => setIsOpenDropdown(!isOpenDropdown)} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5">
        <div className="flex justify-start items-center gap-2">
          <i className={`${statusColor} p-1 border border-gray-500 rounded-full`}></i>
          {reportStatus ? reportStatus : 'Semua'}
        </div>
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="dropdown-list" className={`${!isOpenDropdown && 'hidden'} absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
        <ul className="py-1 text-sm text-gray-700 shadow-lg">
          {statusOptions.map((option) => (
            <li key={option.text}>
              <Link href={option.link} className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
                <i className={`${option.color} p-1 ml-3 border border-gray-500 rounded-full`}></i>
                {option.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
