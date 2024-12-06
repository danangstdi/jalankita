"use client"

import { useState } from "react"

export default function ImgZoom(props) {
  const [isZoom, setIsZoom] = useState(false);
  
  return (
    <>
      <div onClick={() => setIsZoom(!isZoom)} className="w-10 h-10 md:w-16 md:h-16 overflow-hidden hover:cursor-pointer">
        <img src={props.photo} loading="lazy" className="w-full h-full object-cover" alt={`Jalan rusak daerah ${props.alt}`}/>
      </div>
      {isZoom && 
      <div onClick={() => setIsZoom(!isZoom)} className='fixed inset-0 z-30 bg-gray-600 bg-opacity-50 h-full w-full'>
        <button type="button" className="text-slate-100 mt-3 pr-3 w-full flex justify-end">
          <svg className="bg-slate-800 h-11 w-11 p-2 rounded-md" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>
        </button>
        <div className="flex justify-center items-center p-5 -mt-16 h-full w-full">
          <div className="overflow-scroll bg-slate-200 p-3 rounded-lg w-full max-h-[32rem] md:w-[35rem] lg:w-[42rem]">
            <img src={props.photo} loading="lazy" className="h-full w-full" alt={`Jalan rusak daerah ${props.alt}`}/>
          </div>
        </div>
      </div>}
    </>
  )
}
