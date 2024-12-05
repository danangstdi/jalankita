"use client"

import { useState } from "react";
import { Toast } from "@/app/components/Toast";
import { useRouter } from 'nextjs-toploader/app';

export default function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    adminId: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = {
      adminId: form.adminId,
      password: form.password,
    };

    try {
      setLoading(true);
      const req = await fetch("http://localhost:3000/api/admin/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });

      const res = await req.json();
      if (req.ok) {
        Toast("success", res.message);
        router.push('/dashboard');
      } else {
        Toast("error", res.message);
      }
    } catch (err) {
      console.log(err);
      Toast("error", "Terjadi masalah, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Masukkan ID" 
          className="input-field"
          required  
          value={form.adminId}
          onChange={(e) => setForm({ ...form, adminId: e.target.value })}  
        />
        <label htmlFor="input-field" className="input-label">
          Masukkan ID
        </label>
        <span className="input-highlight"></span>
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Masukkan Password"
          className="input-field"
          required 
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <label htmlFor="input-field" className="input-label">
          Masukkan Password
        </label>
        <span className="input-highlight"></span>
      </div>
      <button
        type="submit"
        className="text-sm py-3 px-5 text-white bg-slate-800 hover:bg-slate-600 duration-200"
      >
        {!loading ? 'Masuk' : 'Tunggu Sebentar...'}
      </button>
    </form>
  );
}
