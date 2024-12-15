import React from 'react'

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='lg:ml-[19rem] text-center text-sm text-slate-600 py-5'>
      Copyrights © {currentYear}. All rights reserved by <strong>JalanKita</strong>
    </footer>
  )
}
