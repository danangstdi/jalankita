import Navbar from "@/app/components/Navbar";
import Hero from "./_partials/Hero";
import Specials from "./_partials/Specials";
import About from "./_partials/About";
import Steps from "./_partials/Steps";
import Team from "./_partials/Team";
import Footer from "@/app/components/Footer";

export default function Tentang() {
  return (
    <>
      <Navbar pageNav='Tentang JalanKita'/>
      <main className="mb-12">
        <Hero/>
        <About/>
        <Specials/>
        <Steps/>
        <Team/>
        {/* <TentangKami /> */}
        {/* <TentangAplikasi /> */}
      </main>
      <Footer/>
    </>
  );
}