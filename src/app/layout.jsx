import './globals.css'
import NextTopLoader from 'nextjs-toploader';

export const metadata = {
  title: 'JalanKita',
  applicationName: 'JalanKita',
  creator: 'Team CS7-F015',
  keywords: ['JalanKita', 'jalankita', 'Pelaporan Jalan Rusak', 'Web Pelaporan', 'Dicoding Cycle 7'],
  description: 'JalanKita adalah Platorm Layanan Digital Pengaduan Jalan Rusak berbasis web yang dikembangkan oleh beberapa peserta MSIB Batch 7 Dicoding',
  custom: {
    email: [
      'danangstd17@gmail.com',
      'sachas4f@gmail.com',
      'jevannandayanasmapan@gmail.com',
      'wilsondacosta0205@gmail.com',
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {metadata.custom.email.map((email) => (
          <meta key={email} name="dicoding:email" content={email} />
        ))}
      </head>
      <body className="poppins bg-slate-200">
        <NextTopLoader color="#10b981" height={5}/>
        {children}
      </body>
    </html>
  )
}
