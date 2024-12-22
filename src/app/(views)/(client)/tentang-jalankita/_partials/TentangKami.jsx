import Danang from '@/../public/img/danang.jpg'
import Sacha from '@/../public/img/sacha.jpg'
import Jevan from '@/../public/img/jevan.jpg'
import Willy from '@/../public/img/willy.jpg'
import Image from 'next/image'

export default function TentangKami() {
  return (
    <section className="block w-full xl:h-screen sm:h-auto">
      <h1 className="text-5xl font-bold text-center text-slate-100 mt-20 mb-20">
        Tentang Kami
      </h1>

      {/* Grid Responsif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Anggota 1 */}
        <div className="flex flex-col items-center border border-slate-700 rounded-lg p-4 shadow-lg bg-slate-800">
          <Image 
            loading="lazy"
            src={Sacha}
            alt="Foto Sacha"
            className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-slate-100">
            Sacha Ahsan Firmansyah
          </h2>
          <p className="text-slate-400 mt-2">
            Frontend Developer | UI/UX Designer
          </p>
        </div>

        {/* Anggota 2 */}
        <div className="flex flex-col items-center border border-slate-700 rounded-lg p-4 shadow-lg bg-slate-800">
          <Image 
            loading="lazy"
            src={Danang}
            alt="Foto Danang"
            className="w-74 h-74 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-slate-100">
            Danang Setiadi
          </h2>
          <p className="text-slate-400 mt-2">
            Fullstack Developer
          </p>
        </div>

        {/* Anggota 3 */}
        <div className="flex flex-col items-center border border-slate-700 rounded-lg p-4 shadow-lg bg-slate-800">
          <Image 
            loading="lazy"
            src={Jevan}
            alt="Foto Made Jevan"
            className="w-74 h-74 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-slate-100">
            I Made Jevan Nandayana
          </h2>
          <p className="text-slate-400 mt-2">UI/UX Designer</p>
        </div>

        {/* Anggota 4 */}
        <div className="flex flex-col items-center border border-slate-700 rounded-lg p-4 shadow-lg bg-slate-800">
          <Image 
            loading="lazy"
            src={Willy}
            alt="Foto Willy"
            className="w-74 h-74 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-slate-100">
            Willybrodus Stephanus Da Costa
          </h2>
          <p className="text-slate-400 mt-2">Frontend Developer</p>
        </div>
      </div>
    </section>
  )
}
