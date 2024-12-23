"use client"

import { Toast } from "@/app/components/Toast";
import { getSessionClient } from "@/app/sevices/getSessionClient";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function AddAdmin() {
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    fetch('https://api.cahyadsn.com/provinces', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setProvinces(data.data);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const inputOptions = provinces.reduce((options, province) => {
    options[province.kode] = province.nama;
    return options;
  }, {});

  const generateRandomString = (length = 8) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  const generateAdminIdAndPassword = () => {
    let adminId = generateRandomString(8);
    let password = generateRandomString(8);

    while (adminId === password) {
      password = generateRandomString(8);
    }

    return { adminId, password };
  };

  const toggleHandler = async () => {
    const { value: provinceCode } = await Swal.fire({
      title: "Pilih Hak Akses Admin",
      input: "select",
      inputOptions: inputOptions,
      inputPlaceholder: "Provinsi",
      showCancelButton: true,
      html: "<p class='text-xs p-3 bg-slate-200 text-left'>Kolom ID, AdminId, dan Password akan diisi otomatis.<p>",
    });

    if (provinceCode) {
      try {
        const provinceName = inputOptions[provinceCode];
        const { adminId, password } = generateAdminIdAndPassword();

        await Swal.fire({ 
          html: `<ul class='flex flex-col items-start p-4 bg-slate-200 text-sm'>
                  <li>Hak Akses: ${provinceName}</li>
                  <li>ID Admin: ${adminId}</li>
                  <li>Password: ${password}</li>
                </ul>`
        });
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/admin`,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              adminId: adminId,
              access: provinceCode,
              password: password,
              provinceName: provinceName,
              superAdminId: getSessionClient('jalankita_auth_adminId')
            }),
          }
        );
  
        if (res.ok) {
          localStorage.setItem("addAdminToast", true);
          window.location.reload();
        } else {
          const errorMessage = await res.json();
          Toast('error', `Terjadi kesalahan: ${errorMessage.error}`);
        }
      }catch(err) {
        Toast('error', 'Terjadi kesalahan saat memproses data');
      }
    }
  };

  const useStatusToast = () => {
    useEffect(() => {
      const addAdminToast = localStorage.getItem("addAdminToast");
  
      if (addAdminToast) {
        Toast('success', 'Berhasil menambahkan admin')
        localStorage.removeItem("addAdminToast");
      }
    }, []);
  };
  useStatusToast();

  return (
    <button
      type="button"
      onClick={toggleHandler}
      className="text-sm bg-slate-800 py-3 px-4 text-white hover:bg-slate-600 hover:duration-300"
    >
      Daftarkan
    </button>
  );
}
