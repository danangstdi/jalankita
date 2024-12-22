"use client";

import { Toast } from "@/app/components/Toast";
import { getSessionClient } from "@/app/sevices/getSessionClient";
import { useEffect } from "react";
import Swal from "sweetalert2";

const StatusSelector = ({ id, fullname }) => {
  const statusMap = {
    PENDING: "Menunggu",
    PROGRESS: "Diproses",
    RESOLVED: "Selesai",
    REJECTED: "Ditolak",
  };

  const handleColorSelection = async () => {
    const { value: reportStatus } = await Swal.fire({
      title: "Pilih Status",
      input: "select",
      inputOptions: statusMap,
      // inputOptions: {
      //     PENDING: "Menunggu",
      //     PROGRESS: "Diproses",
      //     RESOLVED: "Selesai",
      //     REJECTED: "Ditolak"
      // },
      inputPlaceholder: "Status Laporan",
      showCancelButton: true,
    });

    if (reportStatus) {
      const reportStatusIndo = statusMap[reportStatus] || "Menunggu";

      try {
        // let reportStatusIndo = '';
        // if (reportStatus == 'PROGRESS') {
        //   reportStatusIndo = 'Diproses';
        // } else if (reportStatus == 'RESOLVED') {
        //   reportStatusIndo = 'Selesai';
        // } else if (reportStatusIndo =='REJECTED') {
        //   reportStatusIndo = 'Ditolak'
        // } else {
        //   reportStatusIndo = 'Menunggu'
        // }

        const adminId = getSessionClient('jalankita_auth_adminId');

        const res = await fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/reports/${id}`,
          {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: id,
              fullname: fullname,
              reportStatus: reportStatus,
              adminId: adminId,
              reportStatusIndo: reportStatusIndo
            }),
          }
        );

        if (res.ok) {
          localStorage.setItem("reportStatusUpdated", reportStatusIndo);
          window.location.reload();
        } else {
          Toast('error', 'Terjadi kesalahan ketika mengubah status');
        }
      }catch(err) {
        Toast('error', 'Terjadi kesalahan saat memproses data');
      }
    }
  };

  const useStatusToast = () => {
    useEffect(() => {
      const reportStatusUpdated = localStorage.getItem("reportStatusUpdated");
  
      if (reportStatusUpdated) {
        Toast('success', `Status telah diubah menjadi: ${reportStatusUpdated}`)
        localStorage.removeItem("reportStatusUpdated");
      }
    }, []);
  };
  useStatusToast();

  return (
    <button onClick={handleColorSelection} 
        className='relative p-3 text-white overflow-hidden bg-slate-800 
        before:absolute before:py-20 before:px-40 before:w-[140%] before:-left-[20rem] before:-top-8 before:rounded-[5rem] before:bg-slate-700
        hover:before:-left-16 hover:before:top-0 hover:before:text-black hover:before:duration-700 hover:before:ease-in-out hover:before:-z-10
        hover:z-10'>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
        </svg>
    </button>
  );
};

export default StatusSelector;
