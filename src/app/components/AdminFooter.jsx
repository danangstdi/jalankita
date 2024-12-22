import React from 'react'

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='text-center text-slate-600 py-5 text-xs md:text-sm lg:ml-[19rem]'>
      Copyrights © {currentYear}. All rights reserved by <strong>JalanKita</strong>
    </footer>
  )
}
