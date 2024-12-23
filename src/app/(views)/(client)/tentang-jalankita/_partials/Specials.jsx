import React from 'react'

export default function Specials() {
  const specialLists = [
    {head: 'Proses Cepat', body: 'Anda hanya perlu mengisi beberapa formulir yang tersedia untuk mengirimkan laporan.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8 w-8 md:h-11 md:w-11 bi bi-lightning-charge-fill" viewBox="0 0 16 16"><path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/></svg>},
    {head: 'Tanpa Perlu Login', body: 'Kirim laporan secara praktis tanpa perlu Login terlebih dahulu.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8 w-8 md:h-11 md:w-11 bi bi-person-bounding-box" viewBox="0 0 16 16"><path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/></svg>},
    {head: 'Akses dimana saja', body: 'Anda dapat mengakses Layanan Digital JalanKita dimanapun dan kapanpun.', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8 w-8 md:h-11 md:w-11 bi bi-pin-map-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z"/><path fillRule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/></svg>},
    {head: 'Antarmuka Responsif', body: 'Antarmuka yang dirancang dengan tools terbaru dengan hasil yang bagus dan responsif', icon: <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-8 w-8 md:h-11 md:w-11 bi bi-grid-fill" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"/></svg>},
  ]

  return (
    <section className='mt-[8rem]'>
      <h2 className='poppins-bold text-3xl px-4 md:mx-20'>Yang Spesial Dari Kami</h2>
      <div className="grid grid-cols-2 gap-x-2 gap-y-10 lg:grid-cols-4 px-4 mt-16 md:gap-y-6 md:gap-x-6 md:mx-20">
        {specialLists.map((list) => (
          <div key={list.head} className='relative px-2 py-8 h-[13rem] bg-slate-800 text-white rounded-2xl shadow-lg'>
            <div className='flex justify-center'>
              <div className='bg-white bg-opacity-70 backdrop-blur-md shadow-xl text-slate-800 w-fit rounded-xl absolute -top-6 p-2 md:p-3 md:-top-7 md:left-5'>
                {list.icon}
              </div>
            </div>
            <div className='flex flex-col gap-2 justify-center items-center h-full md:gap-4'>
              <h3 className='font-semibold text-center'>{list.head}</h3>
              <p className='text-sm text-center'>{list.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
