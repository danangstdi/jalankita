export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='text-center bg-slate-300 text-slate-600 py-5 text-xs md:text-sm'>
      <p className="font-semibold">MSIB Batch 7 - Dicoding Indonesia</p>
      <p className="mt-1"><strong>© {currentYear} JalanKita</strong>. All rights reserved.</p>
    </footer>
  )
}
