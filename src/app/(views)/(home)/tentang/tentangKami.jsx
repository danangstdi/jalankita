const TentangKami = () => {
  return (
    <section className="block w-full xl:h-screen sm:h-auto">
      <h1 className="text-5xl font-bold text-center mb-6 text-slate-100 mt-20 mb-20">
        Tentang Kami
      </h1>

      {/* Grid Responsif */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {/* Anggota 1 */}
        <div className="flex flex-col items-center border border-slate-700 rounded-lg p-4 shadow-lg bg-slate-800">
          <img
            src="/img/sacha.jpg"
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
          <img
            src="/img/danang.jpg"
            alt="Foto Danang"
            className="w-74 h-74 rounded-full mb-4 object-cover"
          />
          <h2 className="text-2xl font-semibold text-slate-100">
            Danang Setiadi
          </h2>
          <p className="text-slate-400 mt-2">
            Frontend Developer | Backend Developer
          </p>
        </div>

        {/* Anggota 3 */}
        <div className="flex flex-col items-center border border-slate-700 rounded-lg p-4 shadow-lg bg-slate-800">
          <img
            src="/img/jevan.jpg"
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
          <img
            src="/img/willy.jpg"
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
  );
};

export default TentangKami;
