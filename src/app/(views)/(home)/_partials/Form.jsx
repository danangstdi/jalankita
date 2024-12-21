"use client";

import { Toast } from "@/app/components/Toast";
import { useState } from "react";
import ProvincesSelector from "./ProvincesSelector";
import RegenciesSelector from "./RegenciesSelector";
import DistrictsSelector from "./DistrictsSelector";

export default function Form() {
  const [form, setForm] = useState({
    fullname: "",
    whatsapp: "",
    province: "",
    regency: "",
    district: "",
    detail: "",
    photo: "",
  });
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [fileAccepted, setFileAccepted] = useState(false);

  const generateRandomText = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let photoUrl = form.photo;

    if (file) {
      const formData = new FormData();
      const randomText = generateRandomText();
      const originalFileName = file.name;
      const newFileName = `${randomText}_${originalFileName}`;

      formData.append("image", file, newFileName);

      try {
        setUploading(true);
        const response = await fetch(
          "https://api.imgbb.com/1/upload?key=9a2571e78da633ce85f7cfb7b647f0b0",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.success) {
          const originalUrl = data.data.url;
          const splitUrl = originalUrl.split("/").slice(3).join("/");
          photoUrl = `https://i.ibb.co.com/${splitUrl}`;
        } else {
          Toast("error", "Gagal mengunggah gambar.");
          return;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Toast("error", "Terjadi kesalahan saat mengunggah gambar.");
        return;
      } finally {
        setUploading(false);
      }
    }

    const sendData = {
      fullname: form.fullname,
      whatsapp: "62" + form.whatsapp,
      province: form.province,
      regency: form.regency,
      district: form.district,
      detail: form.detail,
      photo: photoUrl,
    };

    try {
      const res = await fetch(`https://jalankita.vercel.app/api/reports`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      const resBody = await res.json();
      if (res.ok) {
        Toast("success", "Laporan berhasil dikirim");
        setForm({
          fullname: "",
          whatsapp: "",
          // province: "",
          // regency: "",
          // district: "",
          detail: "",
          photo: "",
        });
        setFile(null);
        setFileAccepted(false);
      } else {
        console.log(`error: ${resBody.message}`);
        Toast("error", resBody.message);
      }
    } catch (err) {
      console.log("Gagal submit!");
      Toast("error", "Terjadi masalah, laporan gagal dikirim");
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div className="form-container bg-slate-50 shadow-lg -mt-14 mx-4 p-4 flex flex-col gap-3 md:-mt-9 md:mx-32 md:shadow-2xl lg:mx-72 lg:py-6 lg:px-8">
          <div className="bg-slate-800 p-3 text-white font-semibold text-center md:text-lg">
            Isi Laporan Anda!
          </div>
          <input
            type="text"
            placeholder="Masukkan Nama Anda"
            required
            value={form.fullname}
            onChange={(e) => setForm({ ...form, fullname: e.target.value })}
            className="p-3 border border-gray-400 bg-transparent"
          />

          <div className="grid grid-cols-12">
            <div className="col-span-2 md:col-span-1 p-3 text-sm border-l border-y border-gray-400 bg-gray-100 text-gray-500 flex justify-center items-center">
              +62
            </div>
            <input
              type="number"
              placeholder="Masukkan Nomor Whatsapp"
              required
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="col-span-10 md:col-span-11 p-3 border border-gray-400 bg-transparent"
            />
          </div>

          <ProvincesSelector
            onChange={(province) => setForm({ ...form, province })}
          />

          <RegenciesSelector
            provinceCode={form.province}
            onChange={(regency) => setForm({ ...form, regency })}
          />

          <DistrictsSelector
            regencyCode={form.regency}
            onChange={(district) => setForm({ ...form, district })}
          />

          <textarea
            rows="6"
            placeholder="Tambahkan detail lokasi seperti bangunan, nama jalan, dan sebagainya"
            value={form.detail}
            onChange={(e) => setForm({ ...form, detail: e.target.value })}
            className="p-3 border border-gray-400 bg-transparent"
          ></textarea>

          <label
            htmlFor="photo"
            className="bg-container cursor-pointer rounded-2xl flex justify-center items-center flex-col bg-gray-500 py-10 text-white md:py-20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              fill="currentColor"
              className="bi bi-image-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
            </svg>
            <p className="text-sm mt-2">
              {!fileAccepted ? 'Lampirkan Foto Sebagai Bukti' : 'File Diterima'}
            </p>
          </label>

          <input
            type="file"
            id="photo"
            className="hidden"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setFile(selectedFile);
              setFileAccepted(!!selectedFile);
            }}
          />

          <button
            type="submit"
            className="p-3 text-white bg-slate-800 hover:bg-slate-600 duration-200"
          >
            {!uploading ? 'LAPORKAN' : 'Tunggu sebentar...'}
          </button>
        </div>
      </form>
    </section>
  );
}
