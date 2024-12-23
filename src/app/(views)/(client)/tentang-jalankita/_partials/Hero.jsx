import Image from "next/image";
import Mockup from '@/../public/img/mockup.webp'

export default function Hero() {
  return (
    <section className="bg-slate-800 min-h-[28rem] pt-32 px-3 flex flex-col items-center md:px-10 md:pt-52">
      <h1 className='poppins-bold text-[1.9rem] text-white text-center md:text-5xl'>
        Lapor Cepat Tanpa Ribet.
      </h1>
      <p className="mt-4 text-white text-center md:text-2xl">
        JalanKita memberikan layanan digital pengaduan jalan rusak tanpa ribet
      </p>
      <Image src={Mockup} loading="lazy" quality={40} alt='Web Pengaduan Jalan Rusak | JalanKita' className="h-fit -mb-80 md:w-3/4 md:-mt-16" />
    </section>
  )
}
