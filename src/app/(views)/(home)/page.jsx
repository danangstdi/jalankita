import Navbar from "@/app/components/Navbar"
import Hero from "./_partials/Hero"
import Form from "./_partials/Form"

export default function Home() {
  return (
    <>
      <Navbar pageNav='Kirim Laporan'/>
      <main className='pb-20'>
        <Hero/>
        <Form/>
      </main>
    </>
  )
}
