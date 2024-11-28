"use client"

import { useState } from "react";

export default function DropdownStatus() {
  const [isOpenDropdownm, setIsOpenDropdown] = useState(false)
  const [isStatus, setIsStatus] = useState({
    status: false,
    text: 'Show All',
    color: 'bg-white'
  })

  return (
    <div>
      <button type="button" id="btn-dropdown" onClick={() => setIsOpenDropdown(!isOpenDropdownm)} className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5">
        <div className="flex justify-start items-center gap-2">
          <i className="p-1 bg-white border border-gray-500 rounded-full"></i>
          Show All
        </div>
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
        </svg>
      </button>
      <div id="dropdown-list" className={`${!isOpenDropdownm && 'hidden'} absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}>
        <ul className="py-1 text-sm text-gray-700 shadow-lg">
          <li>
            <a href="/lihat-laporan/show-all" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-white border border-gray-500 rounded-full"></i>
              SHOW ALL
            </a>
          </li>
          <li>
            <a href="/lihat-laporan/pending" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-gray-500 border border-gray-500 rounded-full"></i>
              PENDING
            </a>
          </li>
          <li>
            <a href="/lihat-laporan/progress" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-yellow-500 border border-gray-500 rounded-full"></i>
              PROGRESS
            </a>
          </li>
          <li>
            <a href="/lihat-laporan/resolved" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-green-500 border border-gray-500 rounded-full"></i>
              RESOLVED
            </a>
          </li>
          <li>
            <a href="/lihat-laporan/rejected" className="py-2 hover:bg-gray-100 flex justify-start items-center gap-2 w-full">
              <i className="p-1 ml-3 bg-red-500 border border-gray-500 rounded-full"></i>
              REJECTED
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
