"use client"

import { Toast } from "@/app/components/Toast";
import { useEffect } from "react";
import Swal from "sweetalert2";

export default function DeleteAdmin(props) {
  const handleSubmit = async (e) => {
    Swal.fire({
        title: `Yakin ingin menghapus admin?`,
        showDenyButton: true,
        confirmButtonText: "Yakin",
        denyButtonText: `Batalkan`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const sendData = {
              id: props.adminIntId,
            };
    
            const resDelete = await fetch("http://localhost:3000/api/admin", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(sendData),
            });
      
            const res = await resDelete.json();
            if (resDelete.ok) {
              localStorage.setItem("adminDeleted", true);
              // Toast("success", res.message);
              window.location.reload();
            } else {
              Toast("error", res.message);
            }
          } catch (err) {
            console.log(err);
            Toast("error", "Terjadi masalah, coba lagi nanti");
          }
        }
      });
    };

    const useStatusToast = () => {
        useEffect(() => {
          const adminDeleted = localStorage.getItem("adminDeleted");
      
          if (adminDeleted) {
            Toast('success', 'Admin berhasil dihapus')
            localStorage.removeItem("adminDeleted");
          }
        }, []);
      };
      useStatusToast();

  return (
    <button
      onClick={handleSubmit}
      className="relative p-3 text-white overflow-hidden bg-slate-800 
                                before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
                                hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
                                hover:z-10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-trash3-fill"
        viewBox="0 0 16 16"
      >
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
      </svg>
    </button>
  );
}
