"use client";

import { Toast } from "@/app/components/Toast";
import { useState, useEffect } from "react";

export default function Form() {
  const [getProvinces, setProvinces] = useState([]);
  const [getRegencies, setRegencies] = useState([]);
  const [getDistricts, setDistricts] = useState([]);
  const [form, setForm] = useState({
    fullname: "",
    whatsapp: "",
    province: "",
    regency: "",
    district: "",
    detail: "",
    photo: "",
  });

  // Provinsi
  useEffect(() => {
    fetch('https://api.cahyadsn.com/provinces', {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }})
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setProvinces(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Kota/Kabupaten
  useEffect(() => {
    if (!form.province) return;
    fetch(`https://api.cahyadsn.com/regencies/${form.province}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }})
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setRegencies(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [form.province]);

  // Kecamatan
  useEffect(() => {
    if (!form.regency) return;
    fetch(`https://api.cahyadsn.com/districts/${form.regency}`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      }})
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setDistricts(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [form.regency]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      fullname: form.fullname,
      whatsapp: form.whatsapp,
      province: form.province, 
      regency: form.regency, 
      district: form.district, 
      detail: form.detail,
      photo: 'https://images.hukumonline.com/frontend/lt5a954764bab1a/lt5a954d70cd9dd.jpg'
    }

    try {
      const res = await fetch("http://localhost:3000/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      if (res.ok) {
        Toast('success', 'Laporan behasil dikirim');
        setForm({fullname: "", whatsapp: "", province: "", regency: "", district: "", detail: "", photo: ""});
      } else {
        Toast('error', 'Terjadi masalah, laporan gagal dikirim');
      }
    } catch (err) {
      console.log('Gagal submit!');
      Toast('error', 'Terjadi masalah, laporan gagal dikirim')
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-container bg-slate-50 shadow-lg -mt-14 mx-4 p-4 flex flex-col gap-3 md:-mt-9 md:mx-32 md:shadow-2xl lg:mx-72 lg:py-6 lg:px-8">
          <div className='bg-slate-800 p-3 text-white font-semibold text-center md:text-lg'>
            Isi Laporan Anda !
          </div>
          <input 
            type="text" 
            placeholder='Masukkan Nama Anda' 
            required 
            value={form.fullname} 
            onChange={(e) => setForm({ ...form, fullname: e.target.value })} 
            className='p-3 border border-gray-400 bg-transparent'/>

          <input 
            type="number" 
            placeholder='Masukkan Nomor Whatsapp' 
            required 
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className='p-3 border border-gray-400 bg-transparent'/>

          <select 
            value={form.province}
            onChange={(e) => {setForm({ ...form, province: e.target.value })}} 
            className='p-3 border border-gray-400 bg-transparent'
          >
              <option value="">== Provinsi ==</option>
              {getProvinces.map((province) => (
                <option key={province.kode} value={province.kode}>{province.nama}</option>
              ))}
          </select>

          <select 
            value={form.regency} 
            onChange={(e) => {setForm({ ...form, regency: e.target.value })}} 
            className='p-3 border border-gray-400 bg-transparent'
          >
            <option value="">== Kota/Kabupaten ==</option>
            {getRegencies.map((regency) => (
              <option key={regency.kode} value={regency.kode}>{regency.nama}</option>
            ))}
          </select>
          
          <select 
            value={form.district} 
            onChange={(e) => {setForm({ ...form, district: e.target.value })}} 
            className='p-3 border border-gray-400 bg-transparent'
          >
            <option value="">== Kecamatan ==</option>
            {getDistricts.map((district) => (
              <option key={district.kode} value={district.kode}>
                {district.nama}
              </option>
            ))}
          </select>

          <textarea 
              name="" 
              id="" 
              rows="6" 
              placeholder='Tambahkan Detail Bila Diperlukan' 
              value={form.detail}
              onChange={(e) => setForm({ ...form, detail: e.target.value })}
              className='p-3 border border-gray-400 bg-transparent'>
          </textarea>

          <label htmlFor="photo" className='bg-container cursor-pointer rounded-2xl flex justify-center items-center flex-col bg-gray-500 py-10 text-white md:py-20'>
            <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-image-fill" viewBox="0 0 16 16">
              <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0"/>
            </svg>
            <p className='text-sm mt-2'>Lampirkan Foto Sebagai Bukti</p>
          </label>

          <input type="file" id='photo' className='hidden'/>

          <button type='submit' 
            className='relative p-3 text-white overflow-hidden bg-slate-800 
            before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[60rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
            hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
            hover:z-10
            md:before:-left-[100rem] lg:before:duration-1000'>
            LAPORKAN
          </button>
        </div>
      </form>
    </section>
  )
}
