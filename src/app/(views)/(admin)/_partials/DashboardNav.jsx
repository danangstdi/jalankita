"use client"

import { useState } from 'react'
import Image from 'next/image'
import Logo from '@/../public/img/jalankita-logo.png'
import Link from 'next/link'
import Swal from "sweetalert2";
import { Toast } from '@/app/components/Toast'
import { getSessionClient } from '@/app/sevices/getSessionClient'

export default function DashboardNav(props) {
  const [isOpen, setIsOpen] = useState(false);

  const listMenu = [
    {link: '/beranda', text: 'Beranda', access: 'ALL', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-houses-fill" viewBox="0 0 16 16"><path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.5 2.5 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354z"/><path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708z"/></svg>},
    {link: '/daftar-laporan', text: 'Daftar Laporan', access: 'ALL', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list-task" viewBox="0 0 16 16"><path fillRule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"/><path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"/><path fillRule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"/></svg>},
    {link: '/daftar-admin', text: 'Daftar Admin', access: 'superAdmin', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg>},
    {link: '/log-audit', text: 'Log Audit', access: 'superAdmin', icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-clipboard-data-fill" viewBox="0 0 16 16"><path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5zM10 8a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1"/></svg>},
  ]

  const adminLevel = getSessionClient('jalankita_auth_level');
  const filteredMenu = listMenu.filter((menu) => {
    if (adminLevel === "superAdmin") {
      return true;
    }
    return menu.access === "ALL";
  });

  const handleLogout = async () => {
    Swal.fire({
      title: "Yakin ingin keluar",
      showDenyButton: true,
      confirmButtonText: "Yakin",
      denyButtonText: `Batalkan`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const adminId = getSessionClient('jalankita_auth_adminId')

          await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/logAudits`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              adminId: adminId,
              action: "Keluar dari sistem",
            }),
          });
  
          document.cookie = "jalankita_auth_adminId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          document.cookie = "jalankita_auth_level=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          document.cookie = "jalankita_auth_access=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          window.location.href = "/admin-authentication";
        } catch (error) {
          console.error("Error logging out:", error);
          Toast("error", "Gagal melakukan logout. Silakan coba lagi.");
        }
      }
    });
  };

  return (
    <>
      <header className='m-2 flex justify-between items-center bg-slate-50 pl-4 py-2 shadow-lg lg:ml-[19rem] lg:py-5'>
        <h1 className='font-semibold'>
          {props.page ? props.page : 'Dasboard Admin'}
        </h1>
        <button type='button' onClick={() => setIsOpen(!isOpen)} className='h-11 w-11 lg:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
      </header>

      <aside className={`${!isOpen ? '-ml-72' : ''} bg-slate-800 shadow-lg fixed inset-y-0 left-0 z-30 w-72 duration-300  lg:ml-0`}>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className='text-white w-full flex justify-end p-4 lg:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </button>
        <Image src={Logo} alt='Logo JalanKita' className='h-12 w-auto px-4 lg:mt-10' />
        <ul className='mt-10 flex flex-col gap-2'>
          {filteredMenu.map((list) => (
            <li key={list.link}>
              <Link href={list.link} className={`${props.page == list.text && 'bg-emerald-500'} flex items-center gap-2 text-white px-3 py-4 hover:bg-emerald-500`}>
                {list.icon}
                {list.text}
              </Link>
            </li>
          ))}
          <li>
            <button type='button' onClick={handleLogout} className='flex items-center gap-2 text-red-400 px-3 w-full py-4 hover:bg-red-400 hover:text-slate-800'>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-door-open-fill" viewBox="0 0 16 16"><path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15zM11 2h.5a.5.5 0 0 1 .5.5V15h-1zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1"/></svg>
              Keluar
            </button>
          </li>
        </ul>
      </aside>
    </>
  )
}
