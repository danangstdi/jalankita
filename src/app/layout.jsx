import './globals.css'
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: 'JalanKita',
  description: 'JalanKita adalah Platorm Layanan Digital Pengaduan Jalan Rusak berbasis web yang dikembangkan oleh beberapa peserta MSIB Batch 7 Dicoding',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="poppins bg-slate-200">
        <NextTopLoader color="#10b981" height={5}/>
        {children}
      </body>
    </html>
  )
}
