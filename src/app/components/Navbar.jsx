"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '@/../public/img/jalankita-logo.png'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && 'bg-slate-800 shadow-lg'} p-4 fixed inset-x-0 top-0 md:px-6 md:py-2 lg:px-14`}>
      <nav className='flex justify-between items-center'>
        <Image src={Logo} alt='Logo JalanKita' className='h-12 w-auto' loading='lazy' />
        <button type='button' onClick={() => setIsOpenNav(!isOpenNav)} className='w-11 h-11 flex items-center justify-center md:hidden'>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="white" className="bi bi-list" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
          </svg>
        </button>
        <ul className={`${!isOpenNav ? 'hidden' : 'nav-list fixed bg-slate-800 shadow-lg inset-y-0 right-0 w-3/4 text-white z-50 px-4 md:static md:bg-transparent md:z-auto md:w-auto'} py-4 md:px-0 md:flex md:items-center md:gap-10`}>
          <li className='p-3 md:hidden'>
            <Image src={Logo} alt='Logo JalanKita' className='h-auto w-3/4' loading='lazy' />
          </li>
          <li className='flex rounded-md text-white hover:bg-slate-700 hover:duration-200 md:hover:bg-transparent md:hover:text-gray-300'>
            <Link href='/' className='w-full h-11 flex items-center p-3 md:p-0 md:w-fit'>
              Tentang JalanKita
            </Link>
          </li>
          <li className='flex rounded-md text-white hover:bg-slate-700 hover:duration-200 md:hover:bg-transparent md:hover:text-gray-300'>
            <Link href='/' className='w-full h-11 flex items-center p-3 md:p-0 md:w-fit'>
              Pusat Bantuan
            </Link>
          </li>
        </ul>
        {
          isOpenNav && 
          <div 
              onClick={() => setIsOpenNav(!isOpenNav)} 
              className='md:hidden fixed inset-0 bg-gray-600 bg-opacity-50 z-40'>
          </div>
        }
      </nav>
    </header>
  )
}
