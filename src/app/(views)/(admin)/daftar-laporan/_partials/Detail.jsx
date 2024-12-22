"use client"

import { useState } from "react";

export default function Detail(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button type="submit" onClick={() => setIsModalOpen(!isModalOpen)} 
          className="relative p-3 text-white overflow-hidden bg-slate-800 
                                  before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                                  hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                                  hover:z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>

        {isModalOpen &&
          <div className="fixed bg-slate-600 bg-opacity-50 inset-0 p-4 z-40 flex flex-col justify-center items-center md:px-40 lg:px-72">
            <div className="w-full flex justify-end">
              <button type="button" onClick={() => setIsModalOpen(!isModalOpen)} className="text-slate-100 -mr-4 z-50">
                <svg className="bg-slate-800 h-11 w-11 p-2 rounded-md" xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
              </button>
            </div>
            <div className="overflow-y-scroll p-2 rounded-4 bg-slate-300 border-8 border-slate-50 w-full max-h-[30rem] -mt-6">
                <h5 className="text-xl font-semibold text-black mt-2">Detail</h5>
                <img src={props.detailPhoto} loading="lazy" alt={`Laporan ${props.detailFullName}`} className="w-full mt-3 rounded-xl"/>
                <p className="mt-5 m-3 text-justify text-black">
                  {props.detailText}
                </p>
            </div>
          </div> 
        }
    </>
  );
}
