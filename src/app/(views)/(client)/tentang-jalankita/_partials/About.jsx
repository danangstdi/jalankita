import React from "react";

export default function About() {
  return (
    <section className="mt-[13rem] md:mt-[24rem] bg-slate-800 px-4 py-10 md:py-16 lg:px-20 xl:px-56">
      <article>
        <h2 className="poppins-bold text-3xl text-white mb-6">
          Apa itu JalanKita
        </h2>
        <p className="text-justify mt-2 text-gray-200 text-sm md:text-base">
          Proyek JalanKita bertujuan untuk mengembangkan sebuah platform berbasis
          web yang memungkinkan masyarakat melaporkan jalan berlubang di berbagai
          wilayah Indonesia. Proyek ini berfokus pada infrastruktur dan pelayanan
          publik untuk mendukung akses mobilitas yang lebih baik dan meningkatkan
          keselamatan pengguna jalan.
        </p>
        <p className="text-justify mt-2 text-gray-200 text-sm md:text-base">
          Jalan berlubang adalah masalah umum di banyak daerah di Indonesia dan
          berdampak negatif pada keselamatan serta kenyamanan pengguna jalan.
          Kondisi ini diperparah dengan keterbatasan sistem pelaporan yang efektif
          dan cepat, sehingga informasi mengenai kerusakan jalan sering terlambat
          diterima oleh instansi terkait. Saat ini, sebagian besar laporan jalan
          rusak dilakukan secara manual atau melalui saluran yang tidak terintegrasi, sehingga sering
          tidak terpantau secara real-time. Di sinilah gap antara kondisi saat ini
          dan tujuan proyek.
        </p>
        <p className="text-justify mt-2 text-gray-200 text-sm md:text-base">
          Saat ini, masyarakat tidak memiliki cara cepat dan
          efisien untuk melaporkan jalan rusak, sedangkan solusi yang diinginkan
          adalah sebuah platform yang dapat mempermudah pelaporan, penyimpanan dan
          pengiriman informasi ke pihak berwenang secara terintegrasi dan akurat.
          Oleh karena itu, JalanKita hadir sebagai solusi digital yang
          memungkinkan pengguna untuk melaporkan kondisi jalan berlubang dengan
          cepat dan mudah melalui satu aplikasi berbasis web.
        </p>
      </article>
    </section>
  );
}
