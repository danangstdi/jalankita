import React from 'react'
import Logo from '@/../public/svg Logo.svg'
import Background from '@/../public/img/login-background.webp'
import Image from 'next/image'


export default function page() {
  return (
    <>
      <div className='bg-slate-300 absolute inset-0 flex items-center justify-center h-full max-h-full px-10 lg:px-32 xl:px-72'>
        <main className='bg-slate-50 grid md:grid-cols-2 w-full rounded-lg overflow-hidden shadow-xl'>
          <section id='left-side' className='bg-slate-50 p-5 lg:p-10'>
            <Image src={Logo} loading='lazy' alt="Logo JalanKita" className='h-14 w-fit rounded-lg bg-slate-900 p-2'/>
            <h1 className='mt-4 text-xl font-semibold'>Selamat Datang!</h1>
            <form action="">
              <div className="input-container">
                <input type="text" placeholder="Masukkan ID" className="input-field"/>
                <label htmlFor='input-field' className="input-label">Masukkan ID</label>
                <span className="input-highlight"></span>
              </div>
              <div className="input-container">
                <input type="text" placeholder="Masukkan Password" className="input-field"/>
                <label htmlFor='input-field' className="input-label">Masukkan Password</label>
                <span className="input-highlight"></span>
              </div>
              <button type="submit" className="text-sm py-3 px-5 text-white bg-slate-800 hover:bg-slate-600 duration-200">
                MASUK
              </button>
            </form>
          </section>
          <section id='right-side' className='hidden bg-auth overflow-hidden md:block'>
          </section>
        </main>
      </div>
    </>
  )
}
